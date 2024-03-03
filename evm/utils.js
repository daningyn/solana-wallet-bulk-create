const { utils, Wallet } = require("ethers");
const ethers = require('ethers');
const { CHAIN } = require("../common/constant");
const chalk = require("chalk");

const transferSepoliaInSeed = async (mnemonic, from, to, value) => {
  
  const provider = new ethers.providers.JsonRpcProvider(CHAIN.rpc_sepolia);
  console.log(provider.connection);

  if (!mnemonic || !from || !to || !value) {
    console.log('Missing parameter!');
    process.exit(0);
  }

  const signer = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`,);
  const mainWalet = signer.connect(provider);

  console.log('Main wallet balance: ', utils.formatEther(await mainWalet.getBalance()));

  for (let i=from; i<=to; i++) {
    const nonce = await mainWalet.getTransactionCount();
    const gasPrice = await mainWalet.getGasPrice();
    const gasLimit = await utils.hexlify(21000);
    const amount = utils.parseUnits(`${value}`);

    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = Wallet.fromMnemonic(mnemonic, path);
    const tx = {
      from: mainWalet.address,
      to: wallet.address,
      value: amount,
      nonce,
      gasLimit,
      gasPrice
    }
    const transaction = await mainWalet.sendTransaction(tx);
    await transaction.wait();
    console.log(chalk.green(`Sent ${utils.formatEther(amount)} to ${wallet.address} Successful!`));
  }

  console.log(utils.formatEther(await mainWalet.getBalance()));

}


module.exports = {
  transferSepoliaInSeed
}
