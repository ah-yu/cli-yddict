#! /usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const query = require('../lib/index');
const config = require('../lib/config')

function setColor(color) {
    config.color = color;
}

program
    .version(package.version)
    .option('-c --color [color]', 'define output string color', setColor)
    .parse(process.argv);

query(program.args.join(' ')).then((word) => {
    console.log(word);
});