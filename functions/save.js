require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('connected!')
  })
  .catch(err=>{
    console.log("Error", err)
  });


  console.log(process.env.MONGO_URI)

const User = require('./user')

exports.handler = async (event, context) => {

    let body = JSON.parse(event.body)
    console.log("BODY",body);

    if(!body._id){
        return {
            statusCode:400,
            body:"Request must have an id."
        }
    }
    
    try {
      const user = await User.findOne({_id:body._id})
      if(user){
        user.flashcards = body.flashcards;
        user.notes = body.notes;
        await user.save();
        return{
          statusCode:200,
          body:JSON.stringify(user)
        }
      }else{
        return{
          statusCode:401,
          body:"Invalid login credentials."
        }
      }
        
    } catch (error) {
        return{
            statusCode:400,
            body:JSON.stringify(error)
        }
    }
    
   

    
  }