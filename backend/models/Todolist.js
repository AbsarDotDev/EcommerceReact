const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoListSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
       
    },
    status:{
        type:Boolean,
        default:true
    }

});
const Todolist=mongoose.model('todolist',TodoListSchema);
Todolist.createIndexes();
module.exports=Todolist