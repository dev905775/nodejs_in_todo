// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// mongoose.connect('mongodb+srv://devendra:9057755963@cluster0.eugyz.mongodb.net/Todo?retryWrites=true&w=majority')
// const conn = mongoose.Collection;
// const userSchema = new mongoose.Schema({
//     _id:mongoose.Schema.Types.ObjectId,
//     username: {type:String,
//         required:true, 
//         index: {unique: true,
//         }},
//     email: {
//         type:String,
//         required: true,
//         index:{
//             unique: true,
//         },
//     },
//     password:{
//         type:String,
//         required: true,               
//     },
//     date:{
//         type:Date,
//         default: Date.now               
//     }
// });

// const userModel = mongoose.model('users', userSchema);
// module.exports = userModel;