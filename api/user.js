// linK register , in the code :- https://www.youtube.com/watch?v=ON0NnDs3W9o

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// // const user = require('../model/user');
// const userModel = require('../modules/user');
// const bcrypt = require('bcrypt');

// router.post('/signup', function(req,res,next){
//     var username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const confirmpassword = req.body.confirmpassword;

//     if(password !== confirmpassword){
//         res.json({
//             message:"Password not matched !",
//         });       

//     }else{

//         bcrypt.hash(password, 10, function(err, hash) {
//             if(err){
//                 return res.json({
//                     message:"Something Wrong, Try Later !",
//                     error:err
//                 }); 
//             }else{
//                 const userDetails = new userModel({
//                     _id:mongoose.Types.ObjectId(),
//                     username:username,
//                     email:email,
//                     password:hash
//                 });
//                 userDetails.save()
//                 .then(doc => {
//                     res.staus(201).json({
//                         message:"User Registration Successfully",
//                         result:doc
//                     });
//                 })
//                 .catch(err => {
//                     res.json(err);
//                 });
//             }
            
//         });       
    
//     }   
    
// });

// module.exports = router;