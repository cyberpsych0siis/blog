import express from 'express';

const app = express();

export default function run() {
    // app.get("/")
    
    app.listen("8080", () => {
        console.log("Express Gateway listening to port 8080");
    });
}