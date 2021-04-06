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
    data:Object
  }));


exports.handler = async (event, context) => {


    const user = new User({
        data:{
            username:event.body.username,
            password:event.body.password,
            flashcards:[],
            notes:[]
        }
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