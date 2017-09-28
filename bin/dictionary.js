#! /usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const query = require('../dist/index').query;

program
    .version(package.version)
    .parse(process.argv);

query(program.args.join(' ')).then((word) => {
    console.log(word);
});