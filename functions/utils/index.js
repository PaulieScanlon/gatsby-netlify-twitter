// API Docs
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
const Twitter = require('twitter-v2')
const { format, differenceInCalendarDays, parseISO } = require('date-fns')

const DATE_FORMAT = 'MMM dd yyy'

function getMediaUrl(attachments, media) {
  if (attachments && attachments.media_keys.length) {
    const bingo = attachments.media_keys.toString()
    const thing = media.filter((media) => media.media_key === bingo)

    return {
      preview_image_url: '',
      url: '',
      ...thing[0],
    }
  } else {
    return {
      media_key: '',
      type: '',
      url: '',
      preview_image_url: '',
    }
  }
}

module.exports = {
  client: new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_KEY_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  }),
  transformSearch: function (data, includes) {
    return data
      .filter((data) => data.author_id === process.env.GATSBY_AUTHOR_ID)
      .map((data) => {
        const { created_at, attachments, possibly_sensitive, public_metrics, text } = data
        return {
          _special: {
            my_username: process.env.GATSBY_TWITTER_USERNAME,
            my_author_id: process.env.GATSBY_AUTHOR_ID,
            formatted_date: format(parseISO(created_at), DATE_FORMAT),
            image_src: getMediaUrl(attachments, includes.media),
          },
          ...data,
        }
      })
  },
  getMentionCount: function (data) {
    return data.reduce((items, item) => {
      let tempCount = item.entities && item.entities.mentions ? item.entities.mentions.length : 0
      return (items += tempCount)
    }, 0)
  },
  getUrlCount: function (data) {
    return data.reduce((items, item) => {
      let tempCount = item.entities && item.entities.urls ? item.entities.urls.length : 0

      return (items += tempCount)
    }, 0)
  },
  getDateRange: function (data) {
    const start = parseISO(data[0].created_at)
    const end = parseISO(data[data.length - 1].created_at)
    return {
      start: format(start, DATE_FORMAT),
      end: format(end, DATE_FORMAT),
      days_between: differenceInCalendarDays(start, end),
    }
  },
}
