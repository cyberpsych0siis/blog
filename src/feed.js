import { Feed } from "feed";
import { findTitle, getSpecificPost, getPosts } from "./posts.js";

function getFeedBase() {
    return new Feed({
        title: "cyberpsych0si.is",
        description: "cyberpsych0si.is posts",
        id: "gemini://gemini.cyberpsych0si.is",
        link: "gemini://gemini.cyberpsych0si.is/",
        language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        favicon: "https://cyberpsych0si.is/favicon.ico",
        // updated: new Date(2013, 6, 14), // optional, default = today
        generator: "awesome", // optional, default = 'Feed for Node.js'
        author: {
            name: "Ril",
            email: "ril@cyberpsych0si.is",
            link: "https://mastodon.lol/@cyberpsych0siis"
        }
    });
}

export function getFeed() {
    const feed = getFeedBase();

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
    // console.log("sent feed");
    return feed.atom1();
}