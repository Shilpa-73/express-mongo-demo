'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require('./lib/db')
const routes = require('./config/routes')
const app = express()
const port =  process.env.PORT;
let models

let corsOptions = {
    origin: [`http://localhost:${port}`, `http://localhost:3000`]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to DB
let connectDB =async ()=>{
   let { db:mongoDB,client } =  await db.mongodb.connect()

    await new Promise((rs,rj)=>{
        mongoDB.listCollections({name: 'user'})
            .next(function(err, info) {
                if (!info) {
                    mongoDB.createCollection("user")

                    mongoDB.collection('user').createIndex( { "username": 1 }, { unique: true } )
                    mongoDB.collection('user').createIndex( { "email": 1 }, { unique: true } )
                }
                rs()
            });
    })

    models = {User:mongoDB.collection('user')}
    return Promise.resolve({db:mongoDB,client})
}
connectDB().then(({db,client})=>{
    app.use('/users', routes.user({app,models,db,client}))
    app.use('/auth', routes.auth({app,models,db,client}))
})

app.get('/', (req, res) => {
    res.send('Hello Welcome to the NodeJS!')
})


app.listen(port, async() => {
    console.log(`Example app listening at http://localhost:${port}`)
})