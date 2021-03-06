module.exports = {
    "slack" : {
        "token": process.env.slack_token,
        "channel": process.env.slack_channel
    },
    "twitter": {
        "consumer_key": process.env.consumer_key,
        "consumer_secret": process.env.consumer_secret,
        "access_token_key": process.env.access_token_key,
        "access_token_secret": process.env.access_token_secret
    }
}