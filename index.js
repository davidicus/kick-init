'use strict';

const fs = require('fs');
const path = require('path');

const repoList = require('./repoInfo.json');

const argsParser = (args) => {
  const length = args.length;
  const repos = `
    STARTER REPO OPTION LIST:

    a: ${repoList.a}
    b: ${repoList.b}
  `;
  const help = `
    USAGE: reaper [option] [flag]
        This generates the option a starter repo in the current directory

    OPTIONS:

    [option] defaults to "a"     will create the [option] starter repo
    -r, --remote                 will create a remote repo for this project
    -h, --help                   print help menu

    STARTER REPO OPTION LIST:

    a: ${repoList.a}
    b: ${repoList.b}
  `;
  const regex = /^-r/g;
  let info = {
    clone: repoList.a,
    local: process.cwd(),
    remote: false
  };

  //if no arguments passed set defaults
  if (length === 0) {
    return info;
  }

  if (args.length > 1 && !regex.exec(args[args.length - 1])) {
    console.log('ERROR: The second argument must either be the "-r" or "--remote" flag');
    throw new Error;
  }

  args.map(arg => {
    // if argument is passed serve up appropriate object
    switch (arg) {
      case 'ls':
        console.log(repos);
        info = null;
        break;
      case '-h':
        console.log(help);
        info = null;
        break;
      case '--help':
        console.log(help);
        info = null;
        break;
      case 'a':
        break;
      case 'b':
        info.clone = repoList.b;
        break;
      case '-r':
        info.remote = true;
        break;
      case '--remote':
        info.remote = true;
        break;
      default:
        console.log(`ERROR: ${args[0]} is not valid argument.`);
        throw new Error;
    }
  });

  return info;
};



module.exports = (args) => {
  let repo = null;
  // const projectDirectory = path.join(process.cwd()

  let info = argsParser(args);
  console.log("INFO: ", info);
  // if (length === 0) {
	// 	throw new TypeError(`Expected a string, got ${typeof input}`);
	// }
  //
	// if (typeof args !== 'string') {
	// 	throw new TypeError(`Expected a string, got ${typeof input}`);
	// }

	// return input + ' & ' + (opts.postfix || 'rainbows');
};
