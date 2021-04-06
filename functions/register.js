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


exports.handler = async (event, context) => {
   

    return{
        statusCode:200,
        body:JSON.stringify(context)
    }
  }