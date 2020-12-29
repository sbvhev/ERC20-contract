import fs from 'fs';
import rimraf from 'rimraf';

if (!fs.existsSync('./abi')) {
  fs.mkdirSync('./abi');
}

fs.copyFileSync(
  './artifacts/contracts/PremiaErc20.sol/PremiaErc20.json',
  './abi/PremiaErc20.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaMiningErc20.sol/PremiaMiningErc20.json',
  './abi/PremiaMiningErc20.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaOption.sol/PremiaOption.json',
  './abi/PremiaOption.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaMarket.sol/PremiaMarket.json',
  './abi/PremiaMarket.json',
);
fs.copyFileSync(
  './artifacts/contracts/PremiaReferral.sol/PremiaReferral.json',
  './abi/PremiaReferral.json',
);

// Test contracts
fs.copyFileSync(
  './artifacts/contracts/test/TestErc20.sol/TestErc20.json',
  './abi/TestErc20.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestTime.sol/TestTime.json',
  './abi/TestTime.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestPremiaOption.sol/TestPremiaOption.json',
  './abi/TestPremiaOption.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestPremiaMarket.sol/TestPremiaMarket.json',
  './abi/TestPremiaMarket.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestTokenSettingsCalculator.sol/TestTokenSettingsCalculator.json',
  './abi/TestTokenSettingsCalculator.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestPremiaStaking.sol/TestPremiaStaking.json',
  './abi/TestPremiaStaking.json',
);
fs.copyFileSync(
  './artifacts/contracts/test/TestFlashLoan.sol/TestFlashLoan.json',
  './abi/TestFlashLoan.json',
);

rimraf.sync('./contractsTyped');
