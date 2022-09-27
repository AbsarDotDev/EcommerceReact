const mongoose= require('mongoose');
const { Schema } = mongoose;

const Products = new Schema({
title:{
    type: String,
    required: true
},
desc:{
    type: String,
    required: true
},
cat:{
    type: String,
    required: true,
}
,
password:{
    type: String,
    required: true
},
phone:{
    type: String,
    required: true
},
address:{
    type: String,
    required: false
} 

});
const User=mongoose.model('users',UserSchema);
User.createIndexes();
module.exports=User