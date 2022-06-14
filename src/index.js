import gemini from 'gemini-server';
import fs from 'fs';
import { getFrontpage } from './frontpage.js';
import { getSpecificPost, postList } from './posts.js';
import run from './http.js';
import { getFeed } from './feed.js';

const options = {
    cert: fs.readFileSync("cert.pem"),
    key: fs.readFileSync("key.pem"),
  };

const app = gemini(options);

app.on("/", (req, res) => {
  res.data(getFrontpage(), "text/gemini");
});

app.on("/posts/:file", (req, res) => {
  res.data(getSpecificPost(req.params.file), "text/gemini");
});

app.on("/posts", (req, res) => {
  res.data(postList(), "text/gemini");
});

app.on("/feed.xml", (req, res) => {
  res.data(getFeed(), "text/xml");
});

app.listen(() => {
  console.log("Listening");
  run();
});