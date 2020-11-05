exports.handler = async () => {
  console.log('handler')
  return {
    statusCode: 200,
    body: 'boop',
  }
}

console.log('boop')
