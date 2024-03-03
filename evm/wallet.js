const { utils, Wallet } = require('ethers');
const fs = require('fs');
const { BULK_GENERATED_WALLETS_FILE } = require('../common/constant');


const bulkCreateEVMWallet = (mnemonic, nw) => {
  if (!nw || !parseInt(nw)) {
    console.log('Missing parameter. Please enter number of wallet which is your wallet number you would like to create');
    process.exit(0);
  }

  let tMnemonic = mnemonic;
  if (!tMnemonic) {
    tMnemonic = utils.entropyToMnemonic(utils.randomBytes(16));
  }

  let results = [];
  for (let i=0; i<nw; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = Wallet.fromMnemonic(tMnemonic, path);
    const publicKey = wallet.address;
    const secretKey = wallet.privateKey;
    results.push(`${i+1} | ${publicKey} | ${secretKey}`);
  }

  fs.writeFileSync(`./${BULK_GENERATED_WALLETS_FILE}`, results.join('\n'), 'utf-8');
  console.log(`Successful, your generated wallets saved at ${BULK_GENERATED_WALLETS_FILE}!${!mnemonic ? ` Your seed: ${tMnemonic}` : ''}`);
}

module.exports = {
  bulkCreateEVMWallet
}
