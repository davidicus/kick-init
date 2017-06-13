'use strict';

const fs = require('fs');
const path = require('path');
const pj = require('./package.json');

//configuration path
const configPath = path.join(
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE),
  '/.kickconfig.json'
);

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
  -l, --list               print starter repo options
  -r, --remote             create a remote repo for this project
  -v, --version            print current version of kick-init package
  -V, --verbose            print out each command being executed

  [repo]                   specify the repo to clone, defaults to first one

  Starter Repo List:
  ${rawRepos}
`;

//regex checking for "-r"
const regex = /^-r/g;

const argsParser = (args) => {

  //define the default info object
  let info = {
    clone: repoList.repos[Object.keys(repoList.repos)[0]],
    local: process.cwd(),
    remote: false,
    verbose: false
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

      //Log kick-init version
      case '-v':
        console.log(pj.version);
        info = null;
        break;

      //Log kick-init version
      case '--version':
        console.log(pj.version);
        info = null;
        break;

      case '-V':
        info.verbose = true;
        break;

      //Log kick-init version
      case '--verbose':
        info.verbose = true;
        break;

      //Log out repo list
      case '-l':
        console.log(repos);
        info = null;
        break;

      //Log out repo list
      case '--list':
        console.log(repos);
        info = null;
        break;

      //user set repo to clone. Expected as next argument
      case '-c':
        info.clone = args[i + 1];
        break;

      //user set repo to clone. Expected as next argument
      case '--clone':
        info.clone = args[i + 1];
        break;

      //Log the help menu
      case '-h':
        console.log(help);
        info = null;
        break;

      //Log the help menu
      case '--help':
        console.log(help);
        info = null;
        break;

      //user called for remote repository to be created
      case '-r':
        info.remote = true;
        break;

      //user called for remote repository to be created
      case '--remote':
        info.remote = true;
        break;
      default:

        //check if argument exist in config file
        if (repoList.repos[arg]) {

          //since it does set it to be cloned
          info.clone = repoList.repos[arg];
        }

        //check if file path or url
        else if (!arg.includes('://')) {

          //if you made it to here you should be
          //a file path or url and you are not
          console.log(`ERROR: ${arg} is not valid argument.`);
          throw new Error;
        }
    }
  });
  
  return info;
};

module.exports = argsParser;
