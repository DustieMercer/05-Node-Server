const e = require('express');

const router = require('express').Router();
const User = require("../db").import("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//***USER SIGN UP *//

router.post('/create', function (req, res) {
    
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}) //expires in seconds, but can use math
            res.json({
                user: user,
                message: "User successfully created",
                sessionToken: token
            });
        }
       )
    .catch(err => res.status(500).json({error:err}))
    });

/* Create a new endpoint : /login
The endpoint is going to be a post request
build a query statement (hard code in a user's email that exists in your database)
use FindOne
Let sequelize return a success
if we find one return user info and if user doesn't exist return "user does not exist"
*/

//***USER LOGIN */

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            email: req.body.user.email 
        }
    })
     
    .then(function loginSuccess(user) {             
            if(user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

                       res.status(200).json({
                        user: user, 
                        message: "user successfully logged in",
                        sessionToken: token
                   })

                } else {
                    res.status(502).send({ error:'Login Failed'});
                }  
                });

            } else {
              res.status(500).json({error:"User not found."})  
            }
        })
        .catch(function (err) {
        res.status(500).json({error:err});
    });
});
    


module.exports = router;