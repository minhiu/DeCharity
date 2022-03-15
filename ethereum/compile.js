const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const ierc20Path = path.resolve(__dirname, 'contracts', 'IERC20.sol');

var input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: fs.readFileSync(campaignPath, 'utf-8')
    },
    'IERC20.sol': {
      content: fs.readFileSync(ierc20Path, 'utf-8')
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

function findImports(path) {
  if (path === 'lib.sol')
    return {
      contents:
        'library L { function f() internal returns (uint) { return 7; } }'
    };
  else return { error: 'File not found' };
}

// New syntax (supported from 0.5.12, mandatory from 0.6.0)
var output = JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
);

// Export output to build path
fs.ensureDirSync(buildPath);
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
