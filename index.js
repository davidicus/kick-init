"use strict";

const argsParser = require("./argsParser").argsParser;
const git = require("./git");

module.exports = args => {
  //parse arguments and pass to git.js
  let info = argsParser(args);
  if (info) {
    git(info);
  }
};
