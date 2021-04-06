exports.handler = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      body: {
        bananas:2,
        apples:7,
        fruits:this.apples + this.bananas
      }
    })
  }