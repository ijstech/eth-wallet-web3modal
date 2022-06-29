const Fs = require('fs');
const { promises: fs } = require("fs")

async function readFile(fileName) {
  return new Promise((resolve, reject) => {
    Fs.readFile(fileName, 'utf8', function (err, data) {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  })
}

async function build() {
  await fs.mkdir('./dist');
  let web3modal = await readFile('./node_modules/web3modal/dist/index.js');
  let walletconnect = await readFile('./node_modules/@walletconnect/web3-provider/dist/umd/index.min.js');
  let content = `
${web3modal}
${walletconnect}
`;
  Fs.writeFileSync('./dist/index.js', content);
};
build();