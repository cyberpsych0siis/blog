import pug from 'pug';
import fs from 'fs';
export default (gemtext) => {
    const template = fs.readFileSync('static/http.pug')
    const fn = pug.compile(template)

    return fn({
        content: gemtext
    });
}