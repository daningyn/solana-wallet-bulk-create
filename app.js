const chalk = require('chalk');
const readlineSync = require('readline-sync');
const dotenv = require('dotenv');
const { bulkCreateSolanaWallet } = require('./solana');
const { bulkCreateEVMWallet, transferSepoliaInSeed } = require('./evm');
const { transferSWANETHInSeed } = require('./evm/utils');


dotenv.config({ path: '.env' });

const main = async () => {
  console.log(chalk.green(`-----Web3 CLI-----.`))

  console.log(chalk.green("1. Create bulk solana wallet"));
  console.log(chalk.green("2. Create bulk evm wallet"));
  console.log(chalk.green("3. Transfer SepoliaETH in seed with range"))
  console.log(chalk.green("4. Transfer SwanETH in seed with range"))

  console.log(chalk.green("0. Exit!"))

  let nameFeature = readlineSync.questionInt("Choose method: ", { min: 0, max: 4 });

  switch (nameFeature) {
    case 1:
      const seedphase = readlineSync.question('Mnemonic (if not, enter to generate new one): ');
      const nw = readlineSync.questionInt('Number of wallet you want to create (required): ');
      bulkCreateSolanaWallet(seedphase, nw);
      break
    case 2:
      const evmSeed = readlineSync.question('Mnemonic (if not, enter to generate new one): ');
      const evmNW = readlineSync.questionInt('Number of wallet you want to create (required): ');
      bulkCreateEVMWallet(evmSeed, evmNW);
      break
    case 3:
      const evmMnemonic = readlineSync.question('Seed: ');
      const evmFrom = readlineSync.questionInt('Seed from: ');
      const evmTo = readlineSync.questionInt('Seed to: ');
      const evmValue = readlineSync.questionFloat('Value: ');
      await transferSepoliaInSeed(evmMnemonic, evmFrom, evmTo, evmValue);
      break
    case 4:
      const swanMnemonic = readlineSync.question('Seed: ');
      const swanFrom = readlineSync.questionInt('Seed from: ');
      const swanTo = readlineSync.questionInt('Seed to: ');
      const swanValue = readlineSync.questionFloat('Value: ');
      await transferSWANETHInSeed(swanMnemonic, swanFrom, swanTo, swanValue);
      break
    default:
      break;
  }
}

main();