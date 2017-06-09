'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

//path to gitbash script
const bin = path.join((process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE), '/Projects_Personal/npmModules/bp-cli/gitbash.sh');

//path to config file
const configPath = path.join((process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE), '/.kickconfig.json');

//pull token out of json object
const token = JSON.parse(fs.readFileSync(configPath));

module.exports = (info) => {

  //spin up child process to run gitbash script
  const child = spawn(`sh`, [bin, info.clone, info.local, info.remote, token.github.token, token.github.username], {stdio:'inherit'}).on('close', () => {
    console.log('all done!!');
  });

};
