module.exports = app => {
    const twitter = require("../controller/twitter.controller");
    var router = require("express").Router();

    router.get("/api/twitter/user", twitter.currentUser);
    router.get("/api/twitter/home", twitter.homeTimeLine);
    router.post("/api/twitter/favorite/:id", twitter.favoriteTweet);
    router.post("/api/twitter/posttweet", twitter.postTweet);
    router.post("/api/twitter/retweet/:id", twitter.retweet);
    router.post("/api/twitter/destroyetweet/:id", twitter.destroyetweet);
    router.get("/api/twitter/searchTweets", twitter.searchTweets);
    app.use( '',router);

};