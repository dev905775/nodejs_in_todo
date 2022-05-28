// link , register form in this code :- https://www.youtube.com/watch?v=_n0NvfiSJ74&t=999s
                            // login    :- https://www.youtube.com/watch?v=IWmIi6E1IAI

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { hash } = require('bcrypt');
// const user = require('../model/user');

router.post('/reg', (req, res, next) => {
    // console.log("hash :-",hash)
    // console.log("req.body.password :-",req.body.password)
    // console.log("password :-",req.body.password, "cpassword :-",req.body.cpassword )
    // if (req.body.password !== req.body.cpassword) {
    //     console.log("password and cpassword not match !")        
    // }
    console.log("req.body.password :-",req.body)
    bcrypt.hash(req.body.password, 10,(err, hash) => {
        // console.log("hash :- ", hash)
        if(err){
            return res.status(500).json({
                success: "false",
                message:'Hash error !',
                data:err.message
            })
        }else{
            // console.log("first");
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                password:hash,
                // cpassword:req.body.cpassword,
                // userType:req.body.userType
            })
            if (req.body.password !== req.body.cpassword) {
                res.json({
                    success: "false",
                    message : "Password and Confirm password not match !"
                })                
            }else{
                user.save()
                .then(doc => {
                    res.status(201).json({
                        success:'true',
                        message:'Successfully Register your Account !',
                        data: doc
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success:'false',
                        message:'Do not register your Id !',
                        data: err.message
                    })
                })

            }
            
        }

    })

});

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message:'User route working !'
//     })
// })



router.post('/login',(req, res, next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return req.status(500).json({
                success: "false",
                message: "User not exist !",
                data:''
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err, result) => {
            if (!result) {
                return res.status(401).json({
                    success:"false",
                    message:"Password not match !",
                    data:result
                })                
            }
            if (result) {
                const token = jwt.sign({
                    username:user[0].username,
                    firstname:user[0].firstname,
                    lastname:user[0].lastname,
                    email:user[0].email,
                    phone:user[0].phone,
                },
                'this is dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(201).json({
                    username:user[0].username,
                    firstname:user[0].firstname,
                    lastname:user[0].lastname,
                    email:user[0].email,
                    phone:user[0].phone,
                    // userType:user[0].userType,
                    token:token
                })
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            success:'false',
            message:'User Id not exist !',
            data: err.message
        })
    })

})



module.exports = router;