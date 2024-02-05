# Solana Wallet bulk generater


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm install
```

## Usage

Create file `.env` then add the wallet's mnemonic (seed phrase)
```
mnemonic="seed phrase here"
```

Run script with parameter `--nw 10`, `10` is the number of wallet you would like to generate
```
node app.js --nw 10
```

The results should be in the syntax `[publicKey] | [secretKey]` in `results.txt`

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)