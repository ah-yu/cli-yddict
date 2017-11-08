#! /usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const query = require('../lib/index');
const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('../config');

const configPath = path.resolve(__dirname, '../config.json');

function setColor(color) {
    config.color = color;
    fs.writeFile(configPath, JSON.stringify(config), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

program
    .version(package.version)
    .option('-c --color [color]', 'define output string color', setColor)
    .parse(process.argv);

query(program.args.join(' '), config).then((word) => {
    console.log(word);
});