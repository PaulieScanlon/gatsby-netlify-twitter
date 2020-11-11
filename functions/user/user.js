const { client } = require('../utils')

exports.handler = async (event, context, callback) => {
  const user = await client.get(`users/by/username/${process.env.GATSBY_TWITTER_USERNAME}`, {
    user: {
      fields:
        'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
    },
  })

  const pinned_tweet = await client.get('tweets?ids=', {
    ids: user.data.pinned_tweet_id,
    tweet: {
      fields: 'entities,attachments,public_metrics',
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
    body: JSON.stringify({ user: user.data, pinned_tweet: pinned_tweet.data[0] }),
  })
}
