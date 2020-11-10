const { format, parseISO } = require('date-fns')

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
  transformSearch: function (data, includes) {
    return data
      .filter((data) => data.author_id === process.env.GATSBY_AUTHOR_ID)
      .map((data) => {
        const { created_at, attachments, possibly_sensitive, public_metrics, text } = data
        return {
          _special: {
            my_username: process.env.GATSBY_TWITTER_USERNAME,
            formatted_date: format(parseISO(created_at), 'MMM dd yyy'),
            image_src: getMediaUrl(attachments, includes.media),
          },
          ...data,
        }
      })
  },
}
