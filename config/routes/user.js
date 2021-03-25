'use strict'
const user = require("express").Router();
const ObjectId = require('mongodb').ObjectId;
const dbLib = require('../../lib/db')
const jwt = require('jsonwebtoken');

let authenticateToken=(req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user

        next()
    })
}

let allRoutes = ({models})=>{

    //User register API
    user.post("/save", async(req, res) => {
        let { User } = models

        if(!req.body.username || !req.body.name || !req.body.email || !req.body.password){
            return res.json({
                flag:false,
                message:'username, name, email, password are the required fields!'
            })
        }

        let generatedPassword = await dbLib.mongodb.generateHash(req.body.password)
        req.body.password = generatedPassword
        console.log(`req.body.password `, generatedPassword)

        User.insertOne(req.body).then(result=>{
            return res.json({
                flag:true,
                message:'Your registration done successfully!'
            })
        })
            .catch(err=>{
                if(err.message.includes('email_1') && err.message.includes('duplicate')){
                    return res.json({
                        flag:false,
                        message:'This email id is already registered please try with other!'
                    })
                }
                if(err.message.includes('username_1') && err.message.includes('duplicate')){
                    return res.json({
                        flag:false,
                        message:'This username already registered please try with other!'
                    })
                }
            })

    })

    //User update API
    user.put("/:id", authenticateToken, async(req, res) => {

        let { User } = models
        let { id } = req.params
        console.log(`id is here!!!`, id)
        let data = req.body

        if(!ObjectId.isValid(id)) return res.json({  flag:false, message:'Invalid ID!'})

        return User.find({_id:ObjectId(id)}).toArray(async (err, docs) =>{
            if(!docs.length) return res.json({flag:false,message:'No Record found for this ID!'})

            //Update the user detail here!
            const updateDoc = {
                $set: data,
            };
            const result = await User.updateOne({_id:ObjectId(id)}, updateDoc, {});
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );

            return res.json({  flag:true, message:'Detail updated!'})
        });
    })

    //User detail get API
    user.get("/detail/:id", authenticateToken, (req, res) => {

        let { User } = models
        let { id } = req.params

        if(!ObjectId.isValid(id)) return res.json({  flag:false, message:'Invalid ID!'})

        return User.find({_id:ObjectId(id)}, { password:0 } ).toArray((err, docs) =>{
            if(!docs.length) return res.json({  flag:false, message:'No Record found for this ID!'})
            if(docs[0].password) delete docs[0].password
            return res.json(docs[0])
        });
    })

    //User delete API
    user.delete("/:id", authenticateToken, async(req, res) => {

        let { User } = models
        let { id } = req.params
        if(!ObjectId.isValid(id)) return res.json({  flag:false,message:'Invalid ID!'})

        const result = await User.deleteOne({_id:ObjectId(id)});
        if (result.deletedCount === 1) {
            return res.json({
                flag:true,
                message: "Successfully deleted one document."
            })
        } else {
            return res.json({
                flag:false,
                message: "No documents matched the query. Deleted 0 documents."
            })
        }
    })

    //User list api
    user.get("/list", async(req, res) => {

        let { User } = models

        return User.find({}).toArray((err, docs) =>{
            return res.json({
                data:docs,
                flag:true
            })
        });
    })

    return user
}

module.exports = allRoutes