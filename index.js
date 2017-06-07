'use strict';

const fs = require('fs');
const path = require('path');

const argsParser = require('./argsParser');



module.exports = (args) => {
  let repo = null;
  // const projectDirectory = path.join(process.cwd()


  let info = argsParser(args);
  if (info) {
		console.log('infotized');
	}
  //
	// if (typeof args !== 'string') {
	// 	throw new TypeError(`Expected a string, got ${typeof input}`);
	// }

	// return input + ' & ' + (opts.postfix || 'rainbows');
};
