const { WebClient } = require('@slack/client');
const config = require('./config.js');

const token = config.slack.token;
const web = new WebClient(token);
const conversationId = config.slack.channel;

function postTweet(tweet) {
    return web.chat.postMessage({ channel: conversationId, text: tweet })
}

module.exports = postTweet;