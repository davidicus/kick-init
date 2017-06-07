'use strict';

// const git = require('simple-git');
const exec = require('child_process').exec;

module.exports = (info) => {
  // spawn('git', [info.clone, info.local]);
  // const git = exec(`git clone ${info.clone} ${info.local}`, function(err, stdout, stderr) {
  //   if (err) throw err;
  //   console.log(stdout);
  // });
  // git().clone(info.clone, info.local);

  const bash = exec(`sh gitbash.sh ${info.clone} ${info.local}`, function(err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
  });
};
