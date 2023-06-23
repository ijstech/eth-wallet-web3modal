const path = require('path');

async function build() {
  let result = await require('esbuild').build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    minify: false,
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
};
build();