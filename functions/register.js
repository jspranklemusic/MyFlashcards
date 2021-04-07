require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('connected!')
  })
  .catch(err=>{
    console.log("Error", err)
  });

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

  
  

    const alreadyExists = await User.findOne({username:body.username})
    if(alreadyExists){
        return{
            statusCode:400,
            body:"Username already exists."
        }
    }

    const hashed = await bcrypt.hash(body.password,1);

    const user = new User({
        username:body.username,
        password:hashed,
        flashcards:[],
        notes:[]
    })

    try {
        const results = await user.save();
        return{
            statusCode:200,
            body:JSON.stringify(results)
        }
    } catch (error) {
        return{
            statusCode:400,
            body:JSON.stringify(error)
        }
    }
    
   

    
  }