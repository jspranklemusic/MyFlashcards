require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

    if(!body.username | !body.password){
        return {
            statusCode:400,
            body:"Request must have a username and a password."
        }
    }


    try {
      const user = await User.findOne({username:body.username})
      
      if(user){
        const isValid = await bcrypt.compare(body.password,user.password);
        if(!isValid) throw new Error("Invalid login credentials.")

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