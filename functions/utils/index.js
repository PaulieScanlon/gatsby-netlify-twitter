const { format, parseISO } = require('date-fns')

module.exports = {
  transformSearch: function (response) {
    return response.map((data) => {
      const { created_at } = data
      return {
        ...data,
        created_at: format(parseISO(created_at), 'MMM dd yyy'),
      }
    })
  },
}
