const fs = require('fs')
fs.writeFileSync('./database.json',"hello")

exports.handler = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(event)
    })
  }