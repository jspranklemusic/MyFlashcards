const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('connected!')
  })
  .catch(err=>{
    console.log("Error", err)
  });


  console.log(process.env.MONGO_URI)


  const User = mongoose.model('User', new mongoose.Schema({
    username:{
        type:String,
        maxlength:100
    },
    password:{
        type:String,
        maxlength:100
    },
    flashcards:Array,
    notes:Array

  }));


exports.handler = async (event, context) => {

    console.log("USERNAME",event.body.username);
    console.log("PASSWORD",event.body.password);

  

    const alreadyExists = await User.findOne({username:event.body.username})
    if(alreadyExists){
        return{
            statusCode:400,
            body:"Username already exists."
        }
    }


    const user = new User({
        username:event.body.username,
        password:event.body.password,
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