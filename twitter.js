const Twitter = require('twitter');
const config = require('./config.json');
var seen = require('./seen.json');
const util = require('util');
const fs = require('fs');
const client = new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
});

const getWithPromise = util.promisify(client.get.bind(client));
const postWithPromise = util.promisify(client.post.bind(client));
const writeWithPromise = util.promisify(fs.writeFile);

function getTweets() {
    return getWithPromise('search/tweets', {
        q: 'from:Lin_Manuel -filter:retweets',
        count: 100,
        tweet_mode: 'extended'
    }).then(filterTweets);
}

async function filterTweets(res) {
    const tweets = res.statuses;

    //Only specific tweets
    let selectedTweets = tweets.filter((tweet) => tweet.full_text.includes('Gmorning') || tweet.full_text.includes('Gnight'));

    //don't include replies
    selectedTweets = selectedTweets.filter((tweet) => tweet.in_reply_to_user_id === null);

    //Remove the ones I have seen
    selectedTweets = selectedTweets.filter((tweet) => !seen.includes(tweet.id_str));

    //get the IDs to favorite
    tweetIDs = selectedTweets.map((tweet) => tweet.id_str);

    await persistSeen(tweetIDs);

    //Return only the text
    selectedTweets = selectedTweets.map((tweet) => tweet.full_text);
    return Promise.resolve(selectedTweets);
}

function persistSeen(IDs) {
    seen = seen.concat(IDs);
    return writeWithPromise('./seen.json', JSON.stringify(seen));
}

module.exports = getTweets;