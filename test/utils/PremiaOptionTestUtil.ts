import { PremiaOption, TestErc20, WETH9 } from '../../contractsTyped';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { BigNumber, BigNumberish } from 'ethers';
import { ONE_WEEK, TEST_TOKEN_DECIMALS, ZERO_ADDRESS } from './constants';
import { formatUnits, parseEther } from 'ethers/lib/utils';
import { mintTestToken, parseTestToken } from './token';

interface WriteOptionArgs {
  address?: string;
  expiration?: number;
  strikePrice?: BigNumberish;
  isCall?: boolean;
  amount?: BigNumber;
  referrer?: string;
}

interface PremiaOptionTestUtilProps {
  testToken: WETH9 | TestErc20;
  dai: TestErc20;
  premiaOption: PremiaOption;
  admin: SignerWithAddress;
  writer1: SignerWithAddress;
  writer2: SignerWithAddress;
  user1: SignerWithAddress;
  feeRecipient: SignerWithAddress;
  tax: number;
}

export class PremiaOptionTestUtil {
  testToken: WETH9 | TestErc20;
  dai: TestErc20;
  premiaOption: PremiaOption;
  admin: SignerWithAddress;
  writer1: SignerWithAddress;
  writer2: SignerWithAddress;
  user1: SignerWithAddress;
  feeRecipient: SignerWithAddress;
  tax: number;

  constructor(props: PremiaOptionTestUtilProps) {
    this.testToken = props.testToken;
    this.dai = props.dai;
    this.premiaOption = props.premiaOption;
    this.admin = props.admin;
    this.writer1 = props.writer1;
    this.writer2 = props.writer2;
    this.user1 = props.user1;
    this.feeRecipient = props.feeRecipient;
    this.tax = props.tax;
  }

  getNextExpiration() {
    const now = new Date();
    const baseExpiration = 172799; // Offset to add to Unix timestamp to make it Fri 23:59:59 UTC
    return (
      ONE_WEEK *
        (Math.floor((now.getTime() / 1000 - baseExpiration) / ONE_WEEK) + 1) +
      baseExpiration
    );
  }

  getOptionDefaults() {
    return {
      token: this.testToken.address,
      expiration: this.getNextExpiration(),
      strikePrice: parseEther('10'),
      isCall: true,
      amount: parseTestToken('1'),
    };
  }

  async addTestToken() {
    return this.premiaOption.setTokens(
      [this.testToken.address],
      [parseEther('10')],
    );
  }

  async writeOption(user: SignerWithAddress, args?: WriteOptionArgs) {
    const defaults = this.getOptionDefaults();

    return this.premiaOption.connect(user).writeOption(
      {
        token: args?.address ?? defaults.token,
        expiration: args?.expiration ?? defaults.expiration,
        strikePrice: args?.strikePrice ?? defaults.strikePrice,
        isCall: args?.isCall == undefined ? defaults.isCall : args.isCall,
        amount: args?.amount == undefined ? defaults.amount : args?.amount,
      },
      args?.referrer ?? ZERO_ADDRESS,
    );
  }

  async mintAndWriteOption(
    user: SignerWithAddress,
    amount: BigNumber,
    isCall = true,
    referrer?: string,
  ) {
    if (isCall) {
      const amountWithFee = amount.add(amount.mul(this.tax).div(1e4));
      await mintTestToken(user, this.testToken, amountWithFee);
      await this.testToken
        .connect(user)
        .approve(this.premiaOption.address, amountWithFee);
    } else {
      const baseAmount = parseEther(
        (Number(formatUnits(amount, TEST_TOKEN_DECIMALS)) * 10).toString(),
      );
      const amountWithFee = baseAmount.add(baseAmount.mul(this.tax).div(1e4));
      await this.dai.mint(user.address, amountWithFee);
      await this.dai
        .connect(user)
        .increaseAllowance(this.premiaOption.address, amountWithFee);
    }

    await this.writeOption(user, { amount, isCall, referrer });
    // const tx = await this.writeOption(user, { amount, isCall, referrer });
    // console.log(tx.gasLimit.toString());
  }

  async addTestTokenAndWriteOptions(
    amount: BigNumber,
    isCall = true,
    referrer?: string,
  ) {
    await this.addTestToken();
    await this.mintAndWriteOption(this.writer1, amount, isCall, referrer);
  }

  async transferOptionToUser1(
    from: SignerWithAddress,
    amount?: BigNumber,
    optionId?: number,
  ) {
    await this.premiaOption
      .connect(from)
      .safeTransferFrom(
        from.address,
        this.user1.address,
        optionId ?? 1,
        amount ?? parseTestToken('1'),
        '0x00',
      );
  }

  async exerciseOption(
    isCall: boolean,
    amountToExercise: BigNumber,
    referrer?: string,
    optionId?: number,
  ) {
    if (isCall) {
      const baseAmount = parseEther(
        formatUnits(amountToExercise.mul(10), TEST_TOKEN_DECIMALS),
      );
      const amount = baseAmount.add(baseAmount.mul(this.tax).div(1e4));
      await this.dai.mint(this.user1.address, amount);
      await this.dai
        .connect(this.user1)
        .increaseAllowance(this.premiaOption.address, amount);
    } else {
      const amount = amountToExercise.add(
        amountToExercise.mul(this.tax).div(1e4),
      );

      await mintTestToken(this.user1, this.testToken, amount);
      await this.testToken
        .connect(this.user1)
        .approve(this.premiaOption.address, amount);
    }

    return this.premiaOption
      .connect(this.user1)
      .exerciseOption(
        optionId ?? 1,
        amountToExercise,
        referrer ?? ZERO_ADDRESS,
      );
  }

  async addTestTokenAndWriteOptionsAndExercise(
    isCall: boolean,
    amountToWrite: BigNumber,
    amountToExercise: BigNumber,
    referrer?: string,
  ) {
    await this.addTestTokenAndWriteOptions(amountToWrite, isCall);
    await this.transferOptionToUser1(this.writer1, amountToWrite);
    await this.exerciseOption(isCall, amountToExercise, referrer);
  }
}
