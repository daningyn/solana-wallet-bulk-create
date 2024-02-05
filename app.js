const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const bip39 = require('bip39');
const dotenv = require('dotenv');
const { HDKey } = require('micro-ed25519-hdkey');
const bs58 = require('bs58');
const fs = require('fs');

dotenv.config({ path: '.env' });
const argv = require('yargs')
              .string('wn')
              .parserConfiguration({
                'parse-numbers': false
              })
              .argv;

const connection = new Connection(clusterApiUrl('mainnet-beta'));
console.log('Connected !');

if (!process.env.mnemonic) {
  console.log('Please add the seed phrase in .env file!');
  process.exit(0);
}

const seed = bip39.mnemonicToSeedSync(process.env.mnemonic, '');
const hdWallet = HDKey.fromMasterSeed(seed.toString('hex'));

const nw = argv.nw;
if (!nw || !parseInt(nw)) {
  console.log('Missing parameter. Please add param --nw 10 with 10 is your wallet number you would like to create');
  process.exit(0);
}

let results = [];
for (let i=0; i<nw; i++) {
  const path = `m/44'/501'/${i}'/0'`;
  const privateKey = hdWallet.derive(path).privateKey;
  const keypair = Keypair.fromSeed(privateKey);
  const publicKey = keypair.publicKey;
  const secretKey = keypair.secretKey;
  results.push(`${publicKey.toBase58()} | ${bs58.encode(secretKey)}`);
}

fs.writeFileSync('./results.txt', results.join('\n'), 'utf-8');

console.log('Done!');

