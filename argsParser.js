"use strict";

const fs = require("fs");
const path = require("path");
const pj = require("./package.json");

//configuration path
const configPath = path.join(
  process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
  "/.kickconfig.json"
);

//check for config file. Use default if none found
const repoList = fs.existsSync(configPath)
  ? require(configPath)
  : require("./repoInfo.json");

//check package version
const version = pj.version;

//get repo urls with property name
const rawRepos = Object.keys(repoList.repos)
  .map(repo => {
    return `${repo}. ${repoList.repos[repo]}`;
  })
  .toString()
  .replace(/,/g, "\n  ");

//output for list flag
const repos = `
  Starter Repo List:
  ${rawRepos}
`;

//output for help flag
const help = `
  Usage:
  kick [repo] [flag]     generate the [repo] starter project in the current directory

  Options:
  -c, --clone              specify a random repo to clone
  -e, --enterprise         use enterprise github instance
  -h, --help               print help menu
  -l, --list               print starter repo options
  -r, --remote             create a remote repo for this project
  -v, --version            print current version of kick-init package
  -V, --verbose            print out each command being executed

  [repo]                   specify the repo to clone, defaults to first one

  Starter Repo List:
  ${rawRepos}
`;

const argsParser = args => {
  //define the default info object
  let info = {
    configPath,
    clone: repoList.repos[Object.keys(repoList.repos)[0]],
    local: process.cwd(),
    remote: false,
    verbose: false,
    enterprise: false
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
      //use enterprise instance
      case "-e":
      case "--enterprise":
        info.enterprise = true;
        break;

      //Log kick-init version
      case "-v":
      case "--version":
        console.log("\x1b[1m\x1b[37m%s\x1b[0m", version);
        info = null;
        break;

      //print out each command being run
      case "-V":
      case "--verbose":
        info.verbose = true;
        break;

      //Log out repo list
      case "-l":
      case "--list":
        console.log("\x1b[1m\x1b[37m%s\x1b[0m", repos);
        info = null;
        break;

      //user set repo to clone. Expected as next argument
      case "-c":
      case "--clone":
        if (typeof args[i + 1] == "string" && args[i + 1].includes(".git")) {
          info.clone = args[i + 1];
        } else {
          console.error(
            "\x1b[31m%s\x1b[0m",
            `ERROR: ${args[i + 1]} is not valid argument following ${arg}.`
          );
          throw new Error();
        }
        break;

      //Log the help menu
      case "-h":
      case "--help":
        console.log(help);
        info = null;
        break;

      //user called for remote repository to be created
      case "-r":
      case "--remote":
        info.remote = true;
        break;

      default:
        //check if argument exist in config file
        if (repoList.repos[arg]) {
          //since it does set it to be cloned
          info.clone = repoList.repos[arg];
        }

        //check if file path or url
        else if (!arg.includes("://")) {
          //if you made it to here you should be
          //a file path or url and you are not
          console.error(
            "\x1b[31m%s\x1b[0m",
            `ERROR: ${arg} is not valid argument.`
          );
          throw new Error();
        }
    }
  });

  return info;
};

module.exports = {
  argsParser,
  repoList
};
