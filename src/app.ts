import { query } from './index';


async function test(str: string) {
    const result = await query(str);
    console.log('result', result);
}

test('你好');