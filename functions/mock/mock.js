const mockResponse = require('./mock-response.json')

exports.handler = (event, context, callback) => {
  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: `${JSON.stringify(mockResponse, null, 2)}`,
  })
}
