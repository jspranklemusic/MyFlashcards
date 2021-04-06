const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('connected!')
  })
  .catch(err=>{
    console.log(err)
  });


  const User = mongoose.model('User', new mongoose.Schema({
    data:Object
  }));


exports.handler = async (event, context, callback) => {
    const event = JSON.stringify(event)
    
    let user = new User({
        data:{
            username:event.body.username,
            password:event.body.password,
            notes:[],
            flashcards:[]
        }
    })
    let response;
    try {
        response = await user.save();
    } catch (error) {
        response = error
    }


    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }