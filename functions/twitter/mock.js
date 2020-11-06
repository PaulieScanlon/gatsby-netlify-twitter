// const mockResponse = require('./mock-response.json')

exports.handler = async (event, context, callback) => {
  // console.log(JSON.parse(mockResponse, null, 2))

  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: { test: 'hello' },
    // body: `${JSON.parse(mockResponse, null, 2)}`,
  })
}
