

import fs from 'fs';
import { getAllPosts } from './posts.js';

const getIntro = () => {
    try {
        return fs.readFileSync("static/intro.gmi").toString() + "\n";
    } catch (e) {
        return "Welcome to this Gemini capsule."
    }
}

export function getFrontpage() {
    return [
        // getLogo(),
        getIntro(),
        "# Latest Posts",
        getAllPosts(),
        "\n=> /posts All Posts",
        "",
        "## Subscribe via Atom to this blog",
        "=> /feed.xml Atom",
        "",
        "=> https://rillo5000.com Visit my https homepage"
    ].join("\n");
}