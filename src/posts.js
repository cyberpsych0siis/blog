import fs, { link } from 'fs';
import path from 'path';

export function getAllPosts() {
    const mapped = getPosts();

    if (mapped.length == 0) {
        return "No posts found yet, come back later again :)"
    } else {
        return mapped.map(e => {
            console.log(e);
            return "=>" + e.href + " " + e.title;
        })
    }
}

export function findTitle(text) {
    const titleDoc = text.match(/(# )\w+/);

    if (titleDoc.length == 0) {
        return "Untitled Post";
    } else {
        return titleDoc[0].split("# ")[1];
    }
}

//########

export function findFirstTitle(text) {
    const titleDoc = text.match(/(# )\w+/);

    if (titleDoc.length == 0) {
        return "Untitled Post";
    } else {
        return titleDoc[0].split("# ")[1];
    }
}


export function getPosts() {
    //Sort the posts
    let sortedPosts = fs.readdirSync("posts").sort((a, b) => {
        const fsA = new Date(fs.statSync("posts/" + a).birthtime).getTime();
        const fsB = new Date(fs.statSync("posts/" + b).birthtime).getTime();

        return fsB - fsA;
    });

    return sortedPosts.map((e) => {
        const content = fs.readFileSync("posts/" + e).toString();
        const title = findFirstTitle(content);
        const link = "/posts/" + e;
        const date = fs.statSync("posts/" + e);

        return {
            title: title,
            id: link,
            href: link,
            content: content,
            updated: new Date(date.mtime),
            date: new Date(date.birthtime)
        }
    });
}

export function postList() {
    return "# All Posts\n" + getPosts().map((e) => {
        return "=>" + e.href + " " + e.title
    }).join("\n");
}

export function getSpecificPost(filename) {
    let posts = fs.readdirSync("posts/");
    const filenameFix = filename.replaceAll("-", " ");
    let index = posts.indexOf(filenameFix);
    if (index != -1) {
        const requestedText = fs.readFileSync("posts/" + path.basename(filenameFix));
        return requestedText.toString();
    } else {
        return "# Not found\n=> / Back to homepage";
    }
}