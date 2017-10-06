import * as request from "request-promise-native"
import * as cheerio from "cheerio";

const chalk = require('chalk');
const isChinese = require('is-chinese');

export function query(word: string) {
    const isCN = isChinese(word);
    const color_output = chalk.keyword('white');


    const URL = isCN ? `http://dict.youdao.com/w/eng/${encodeURIComponent(word)}`
        : `http://dict.youdao.com/w/${word}`

    const options = {
        uri: URL,
        transform: (body: any) => { return cheerio.load(body); }
    }

    return request(options).then(($: CheerioStatic) => {
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