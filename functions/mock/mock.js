const mockResponse = require('./mock-response.json')
const { transformSearch } = require('../utils')

exports.handler = (event, context, callback) => {
  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: `${JSON.stringify(transformSearch(mockResponse), null, 2)}`,
  })
}
