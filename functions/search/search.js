const { client, transformSearch, getMentionCount, getUrlCount, getDateRange } = require('../utils')

exports.handler = async (event, context, callback) => {
  const { data, meta, includes, errors } = await client.get('tweets/search/recent', {
    query: process.env.GATSBY_TWITTER_USERNAME,
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
        data: transformSearch(data, includes),
        mention_count: getMentionCount(data),
        url_count: getUrlCount(data),
        date_range: getDateRange(data),
      },
      null,
      2,
    )}`,
  })
}
