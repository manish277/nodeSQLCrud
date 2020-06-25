const Twit = require('twit');
const config = require('../config/twitter.config')
const Tclient = new Twit(config)
let cache = [];
let cacheAge = 0;

// This will show the currrent logged in user 
exports.currentUser = (req, res) => {
    Tclient.get('account/verify_credentials').then(user => {
        res.send(user)
    }).catch(error => {
        res.send(error);
    });
};

exports.searchTweets = (req, res) => {
    params = {
        q: "sushant since:2020-04-11"
    }
    Tclient.get('search/tweets', params).then(tweets => {

        res.send(tweets)
    }).catch(error => {
        res.send(error);
    });
};

//home time line gives all tweets post by current user
exports.homeTimeLine = (req, res) => {
    if (Date.now() - cacheAge > 60000) {
        cacheAge = Date.now();
        const params = { tweet_mode: 'extended', count: 200 };
        if (req.query.since) {
            params.since_id = req.query.since;
        }
        Tclient.get(`statuses/home_timeline`, params)
            .then(timeline => {
                cache = timeline;
                res.send(timeline);
            })
            .catch(error => res.send(error));
    } else {
        res.send(cache);
    }
};

exports.favoriteTweet = (req, res) => {
    const path = (req.body.state) ? 'create' : 'destroy';
    Tclient.post(`favorites/${path}`, { id: req.params.id })
        .then(tweet => res.send(tweet))
        .catch(error => res.send(error));
};
exports.postTweet = (req, res) => {
    tweet = req.body;
    // formate = {status:tweet msg}
    Tclient.post(`statuses/update`, tweet)
        .then(tweeting => {
            res.send(tweeting);
        })
        .catch(error => {
            res.send(error);
        });

};

exports.retweet = (req, res) => {
    let id = req.params.id
    // id=id.toString();
    const path = (req.body.state) ? 'retweet' : 'unretweet';
    Tclient.post(`statuses/${path}/:id`,{id:id})
        .then(tweet => res.send(tweet))
        .catch(error => res.send(error));

};
exports.destroyetweet = (req, res) => {
    let id = req.params.id
    id=id.toString();
    Tclient.post(`statuses/destroy/:id`,{id:id})
        .then(tweet => res.send(tweet))
        .catch(error => res.send(error));

};