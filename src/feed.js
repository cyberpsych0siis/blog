import { Feed } from "feed";
import { findTitle, getSpecificPost, getPosts } from "./posts.js";

function getFeedBase() {
    return new Feed({
        title: "Feed Title",
        description: "This is my personal feed!",
        id: "http://example.com/",
        link: "http://example.com/",
        language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: "http://example.com/image.png",
        favicon: "http://example.com/favicon.ico",
        copyright: "All rights reserved 2013, John Doe",
        // updated: new Date(2013, 6, 14), // optional, default = today
        generator: "awesome", // optional, default = 'Feed for Node.js'
        feedLinks: {
            json: "https://example.com/json",
            atom: "https://example.com/atom"
        },
        author: {
            name: "John Doe",
            email: "johndoe@example.com",
            link: "https://example.com/johndoe"
        }
    });
}

export function getFeed() {
    const feed = getFeedBase();
    // console.log(getPosts());

/*     for (const page of getPostsSorted()) {
        console.log(page);
        const href = "gemini://gemini.cyberpsych0si.is/posts/" + page;
        const postTitle = findTitle(getSpecificPost(page));
        console.log(postTitle, href);

        feed.addItem({
            title: postTitle,
            id: href,
            link: href,
            content: getSpecificPost(page),
            updated: new Date(2022, 1, 1)
        });
    } */

    for (const page of getPosts()) {
        feed.addItem({
            title: page.title,
            id: "//gemini.cyberpsych0si.is" + page.href,
            link: "//gemini.cyberpsych0si.is" + page.href,
            content: page.content,
            date: page.date,
            updated: page.updated
        });
    }
    console.log("sent feed");
    return feed.atom1();
}