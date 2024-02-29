const chalk = require('chalk');
const readlineSync = require('readline-sync');
const dotenv = require('dotenv');
const { bulkCreateSolanaWallet } = require('./solana');
const { bulkCreateEVMWallet } = require('./evm');


dotenv.config({ path: '.env' });

const main = () => {
  console.log(chalk.green(`-----Web3 CLI-----.`))

  console.log(chalk.green("1. Create bulk solana wallet"));
  console.log(chalk.green("2. Create bulk evm wallet"));

  console.log(chalk.green("0. Exit!"))

  let nameFeature = readlineSync.questionInt("Choose method: ", { min: 0, max: 1 });
  
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
    default:
      break;
  }
}

main();