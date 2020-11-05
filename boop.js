require('dotenv').config()
const Twitter = require('twitter-v2')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

module.exports = async () => {
  const { data, errors } = await client.get('tweets/search/recent', {
    query: 'PaulieScanlon',
    max_results: '100',
    tweet: {
      fields:
        'author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld',
    },
  })
  console.log('errors:', errors)
  console.log('data:', data)
}

require('make-runnable')
