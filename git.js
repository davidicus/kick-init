'use strict';

const fs = require('fs');
const path = require('path');

// const git = require('simple-git');
// const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

//path to gitbash script
const bin = path.join((process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE), '/Projects_Personal/npmModules/bp-cli/gitbash.sh');

//path to config file
const configPath = path.join((process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE), '/.reaperconfig.json');

//pull token out of json object
const token = JSON.parse(fs.readFileSync(configPath));

module.exports = (info) => {
  // spawn('git', [info.clone, info.local]);
  // const git = exec(`git clone ${info.clone} ${info.local}`, function(err, stdout, stderr) {
  //   if (err) throw err;
  //   console.log(stdout);
  // });
  // git().clone(info.clone, info.local);
  // const bash = exec(`sh ${bin} ${info.clone} ${info.local} ${token}`, function(err, stdout, stderr) {
  //   if (err) throw err;
  //   console.log(stdout);
  // });
  const child = spawn(`sh`, [bin, info.clone, info.local, info.remote, token.github.token, token.github.username], {stdio:'inherit'}).on('close', () => {
    console.log('all done!!');
  });

};
