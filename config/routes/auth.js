'use strict'
const router = require("express").Router();
const jwt = require('jsonwebtoken');
const dbLib = require('../../lib/db')

let allRoutes = ({models})=>{

    router.post("/signin", (req, res) => {

        let { User } = models
        let { username, password } = req.body

        return User.find({username}).toArray((err, docs) =>{
            if(!docs.length) return res.json({
                flag:false,
                message:'Invalid username!'
            })

            if(!dbLib.mongodb.validPassword(password, docs[0].password)) {
                return res.json({
                    flag:false,
                    message:'Invalid Password!'
                })
            }

            let token = jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: "1d" });

            return res.json({
                flag:true,
                token,
                username
            })
        });
    })

    return router
}

module.exports = allRoutes