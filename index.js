const twitterBot = require('./twitter');
const postToSlack = require('./slack');

twitterBot().then((tweets) => {
    console.log(tweets);
    tweets.forEach(postToSlack)
}).catch((err) => console.log(err))