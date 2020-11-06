const mockResponse = require('./mock-response.json')
const { transformSearch } = require('../utils')

exports.handler = (event, context, callback) => {
  console.log('event.body.userNameA: ', JSON.parse(event.body).userNameA)

  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: `${JSON.stringify(transformSearch(mockResponse), null, 2)}`,
  })
}
