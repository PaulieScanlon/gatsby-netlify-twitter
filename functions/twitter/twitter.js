const Twitter = require('twitter-v2')
const { transformSearch } = require('../utils')

// API Docs
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

exports.handler = async (event, context, callback) => {
  const { data, meta, includes, errors } = await client.get('tweets/search/recent', {
    query: JSON.parse(event.body).userNameA,
    max_results: '100',
    tweet: {
      fields:
        'author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld',
    },
    expansions: 'attachments.media_keys',
    media: {
      fields: 'preview_image_url,url',
    },
  })

  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: `${JSON.stringify(
      {
        data: transformSearch(data),
        meta,
        includes,
      },
      null,
      2,
    )}`,
  })
}
