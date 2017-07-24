#!/usr/bin/env node
'use strict';
const meow = require('meow');
const mvgNode = require('.');

const cli = meow(`
	Usage
	  $ mvg-node [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ mvg-node
	  unicorns & rainbows
	  $ mvg-node ponies
	  ponies & rainbows
`);

console.log(mvgNode(cli.input[0] || 'unicorns'));
