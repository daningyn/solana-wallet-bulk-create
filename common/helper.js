export async function writeFile(path, text) {
  fs.writeFileSync(path, text, 'utf-8');
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function explorerURL({
  address,
  txSignature,
  baseExplorerUrl
}) {
  let baseUrl;
  //
  if (address) baseUrl = `${baseExplorerUrl}/address/${address}`;
  else if (txSignature) baseUrl = `${baseExplorerUrl}/tx/${txSignature}`;
  else return "[unknown]";
  const url = new URL(baseUrl);
  return url.toString() + "\n";
}

