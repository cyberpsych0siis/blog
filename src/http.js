import express from 'express';
import geminiFetch from 'gemini-fetch';
import * as Gemtext from 'gemtext';
import renderer from './renderer.js';

const app = express();

const fetchFromGemini = (link) => {
    const gFetch = geminiFetch({
        followRedirects: true,
        useClientCerts: false
    });

    return gFetch('gemini://localhost' + link)
        .then(async e => {
            let text = await e.text();
            if (e.body.meta == "text/gemini") {
                const parsed = Gemtext.parse(text).generate(Gemtext.HTMLRenderer)
                return renderer(parsed);
            } else {
                return text;
            }
        });
}

export default function run() {
    app.get("*", async (req, res) => {
        console.log(req.url);
        const gem = await fetchFromGemini(req.path);
        // console.log(gem);
        
        res.send(gem);
    })

    app.listen("8080", () => {
        console.log("Express Gateway listening to port 8080");
    });
}