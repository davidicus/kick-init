'use strict';

const fs = require('fs');
const path = require('path');

const argsParser = require('./argsParser');
const git = require('./git');

module.exports = (args) => {

  //parse arguments and pass to git.js
  let info = argsParser(args);
  if (info) {
		git(info);
	}
};
