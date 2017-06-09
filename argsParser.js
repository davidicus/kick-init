'use strict';

const fs = require('fs');
const path = require('path');
const pj = ('./package.json');

//configuration path
const configPath = path.join((process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE), '/.kickconfig.json');

//check for config file. Use default if none found
const repoList = (fs.existsSync(configPath)) ? require(configPath) : require('./repoInfo.json');

//check package version
const version = require("./package.json").version;

//get repo urls with property name
const rawRepos = Object.keys(repoList.repos).map(repo => {
  return `${repo}. ${repoList.repos[repo]}`;
}).toString().replace(/,/g, "\n  ");

//output for list flag
const repos = `
  Starter Repo List:
  ${rawRepos}
`

//output for help flag
const help = `
  Usage:
  kick [repo] [flag]     generate the [repo] starter project in the current directory

  Options:
  -c, --clone              specify a random repo to clone
  -h, --help               print help menu
  -l, --list               list starter repo options
  -r, --remote             create a remote repo for this project
  -v, --version            get current version of kick-init package

  [repo]                   specify the repo to clone, defaults to "a"

  Starter Repo List:
  ${rawRepos}
`;

//regex checking for "-r"
const regex = /^-r/g;

const argsParser = (args) => {

  //define the default info object
  let info = {
    clone: repoList.repos.a,
    local: process.cwd(),
    remote: false
  };

  //check if there are any arguments
  const length = args.length;

  //if no arguments passed return the defaults
  if (length === 0) {
    return info;
  }

  //parse each argument
  args.map((arg, i) => {

    // if argument is passed serve up appropriate object
    switch (arg) {
      case '-v':
        console.log(pj.version);
        info = null;
        break;
      case '--version':
        console.log(pj.version);
        info = null;
        break;
      case '-l':
        console.log(repos);
        info = null;
        break;
      case '--list':
        console.log(repos);
        info = null;
        break;
      case '-c':
        info.clone = args[i + 1];
        break;
      case '--clone':
        info.clone = args[1];
        break;
      case '-h':
        console.log(help);
        info = null;
        break;
      case '--help':
        console.log(help);
        info = null;
        break;
      case '-r':
        info.remote = true;
        break;
      case '--remote':
        info.remote = true;
        break;
      default:
        if (repoList.repos[arg]) {
          info.clone = repoList.repos[arg];
        }
        else if (!arg.includes('://')) {
          console.log(`ERROR: ${arg} is not valid argument.`);
          throw new Error;
        }
    }
  });
  console.log(info);
  return info;
};

module.exports = argsParser;
