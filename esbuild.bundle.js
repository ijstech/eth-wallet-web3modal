const path = require('path');
const Fs = require('fs');

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
  let result = await require('esbuild').build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    minify: true,
    format: 'cjs',
    plugins: [
      {
        name: 'alias',
        setup(build) {
          build.onResolve({ filter: /^tslib$/ }, args => {
            return { path: path.resolve(__dirname, './node_modules/tslib/tslib.es6.js') };
          });
        },
      },
    ],
  }).catch(() => process.exit(1));
  let web3modal = await readFile('./dist/index.js');
  let content = `
define("@ijstech/eth-wallet-web3modal",(require, exports)=>{
let global = window;
${web3modal}
});
`;
    Fs.writeFileSync('./dist/index.js', content);
};
build();