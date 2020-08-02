const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.

// console.log('paths', tsConfig.compilerOptions.paths);

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
