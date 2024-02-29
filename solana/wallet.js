const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const bip39 = require('bip39');
const { HDKey } = require('micro-ed25519-hdkey');
const bs58 = require('bs58');
const fs = require('fs');
const { BULK_GENERATED_WALLETS_FILE } = require('../common/constant');

const bulkCreateSolanaWallet = (mnemonic, nw) => {
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  console.log('Connected !');

  if (!nw || !parseInt(nw)) {
    console.log('Missing parameter. Please enter number of wallet which is your wallet number you would like to create');
    process.exit(0);
  }

  let tMnemonic = mnemonic;
  if (!tMnemonic) {
    tMnemonic = bip39.generateMnemonic();
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic, '');
  const hdWallet = HDKey.fromMasterSeed(seed.toString('hex'));

  let results = [];
  for (let i=0; i<nw; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const privateKey = hdWallet.derive(path).privateKey;
    const keypair = Keypair.fromSeed(privateKey);
    const publicKey = keypair.publicKey;
    const secretKey = keypair.secretKey;
    results.push(`${i+1} | ${publicKey.toBase58()} | ${bs58.encode(secretKey)}`);
  }

  fs.writeFileSync(`./${BULK_GENERATED_WALLETS_FILE}`, results.join('\n'), 'utf-8');
  console.log(`Successful, your generated wallets saved at ${BULK_GENERATED_WALLETS_FILE}!${!mnemonic ? ` Your seed: ${tMnemonic}` : ''}`);
}

module.exports = {
  bulkCreateSolanaWallet
}

