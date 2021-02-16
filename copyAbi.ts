import fs from 'fs';
import rimraf from 'rimraf';

rimraf.sync('./abi');

if (!fs.existsSync('./abi')) {
  fs.mkdirSync('./abi');
}

fs.copyFileSync(
  './artifacts/contracts/FeeCalculator.sol/FeeCalculator.json',
  './abi/FeeCalculator.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaBondingCurve.sol/PremiaBondingCurve.json',
  './abi/PremiaBondingCurve.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaDevFund.sol/PremiaDevFund.json',
  './abi/PremiaDevFund.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaErc20.sol/PremiaErc20.json',
  './abi/PremiaErc20.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaFeeDiscount.sol/PremiaFeeDiscount.json',
  './abi/PremiaFeeDiscount.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaUncutErc20.sol/PremiaUncutErc20.json',
  './abi/PremiaUncutErc20.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaPBC.sol/PremiaPBC.json',
  './abi/PremiaPBC.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaMaker.sol/PremiaMaker.json',
  './abi/PremiaMaker.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaMarket.sol/PremiaMarket.json',
  './abi/PremiaMarket.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaMining.sol/PremiaMining.json',
  './abi/PremiaMining.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaOption.sol/PremiaOption.json',
  './abi/PremiaOption.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaOptionBatch.sol/PremiaOptionBatch.json',
  './abi/PremiaOptionBatch.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaReferral.sol/PremiaReferral.json',
  './abi/PremiaReferral.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaStaking.sol/PremiaStaking.json',
  './abi/PremiaStaking.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaVesting.sol/PremiaVesting.json',
  './abi/PremiaVesting.json',
);
fs.copyFileSync(
  './artifacts/contracts/PriceProvider.sol/PriceProvider.json',
  './abi/PriceProvider.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaVoteProxy.sol/PremiaVoteProxy.json',
  './abi/PremiaVoteProxy.json',
);

fs.copyFileSync(
  './artifacts/contracts/PremiaUncutErc20Wrapper.sol/PremiaUncutErc20Wrapper.json',
  './abi/PremiaUncutErc20Wrapper.json',
);

// Test contracts
fs.copyFileSync(
  './artifacts/contracts/test/TestErc20.sol/TestErc20.json',
  './abi/TestErc20.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestPremiaBondingCurveUpgrade.sol/TestPremiaBondingCurveUpgrade.json',
  './abi/TestPremiaBondingCurveUpgrade.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestPremiaFeeDiscount.sol/TestPremiaFeeDiscount.json',
  './abi/TestPremiaFeeDiscount.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestNewPremiaFeeDiscount.sol/TestNewPremiaFeeDiscount.json',
  './abi/TestNewPremiaFeeDiscount.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestFlashLoan.sol/TestFlashLoan.json',
  './abi/TestFlashLoan.json',
);

// UniswapV2
fs.copyFileSync(
  './contracts/uniswapV2/abi/UniswapV2Factory.json',
  './abi/UniswapV2Factory.json',
);
fs.copyFileSync(
  './contracts/uniswapV2/abi/UniswapV2Pair.json',
  './abi/UniswapV2Pair.json',
);
fs.copyFileSync(
  './contracts/uniswapV2/abi/UniswapV2Router02.json',
  './abi/UniswapV2Router02.json',
);
fs.copyFileSync(
  './artifacts/contracts/uniswapV2/WETH.sol/WETH9.json',
  './abi/WETH9.json',
);

rimraf.sync('./contractsTyped');
