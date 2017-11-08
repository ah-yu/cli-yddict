'use strict'

const chalk = require('chalk');
const isChinese = require('is-chinese');
const request = require('request-promise-native');
const cheerio = require('cheerio');
const config = require('./config');



module.exports = function query(word) {
    const isCN = isChinese(word);
    const color_output = chalk.keyword(config.color);


    const URL = isCN ? `http://dict.youdao.com/w/eng/${encodeURIComponent(word)}` :
        `http://dict.youdao.com/w/${word}`

    const options = {
        uri: URL,
        transform: (body) => {
            return cheerio.load(body);
        }
    }

    return request(options).then(($) => {
        let result = '';
        if (isCN) {
            $('div.trans-container > ul').find('p.wordGroup').each(function (i, elm) {
                var line = $(elm).text().replace(/\s+/g, " ");
                result += line;
            });
        } else {
            result = color_output($('div#phrsListTab > div.trans-container > ul').text());
        }
        return result;
    });
}