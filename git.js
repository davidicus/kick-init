"use strict";

const fs = require("fs");
const { spawn } = require("child_process");

//path to gitbash script
const bin = __filename.replace(/git.js/i, "gitbash.sh");

module.exports = info => {
  let github = null;
  let args = [
    bin,
    info.clone,
    info.local,
    info.remote,
    info.verbose,
    info.enterprise
  ];

  //check if remote and if so if github property is present
  if (
    info.remote &&
    fs.existsSync(info.configPath) &&
    (github = require(info.configPath).github)
  ) {
    if (info.enterprise) {
      args.push(github.ent_token, github.ent_username, github.ent_hostname);
    } else {
      args.push(github.token, github.username);
    }
  }

  //spin up child process to run gitbash script
  spawn(`sh`, args, { stdio: "inherit" }).on("close", () =>
    console.log("All done!!")
  );
};
