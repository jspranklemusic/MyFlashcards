const mongoose = require('mongoose')

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


module.exports = User