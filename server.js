'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require('./lib/db')
const router = require('./config/router')
const app = express()
const port =  process.env.PORT;
let models

let corsOptions = {
    origin: `http://localhost:${port}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to DB
let connectDB =async ()=>{
   let { orms } =  await db.sequelize.connect()
    models = orms

    return Promise.resolve()
}
connectDB().then(()=>{app.use('/sales', router({app,models}))})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, async() => {
    console.log(`Example app listening at http://localhost:${port}`)
})