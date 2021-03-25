'use strict'
const bcrypt = require('bcryptjs');

module.exports = {
    mongodb:{
        connect:async()=>{

            return new Promise((rs,rj)=>{
                try{
                    const MongoClient = require('mongodb').MongoClient;
                    const assert = require('assert');

                    // Connection URL
                    const url = 'mongodb://localhost:27017';

                    // Database Name
                    const dbName = 'test';
                    const client = new MongoClient(url);

                    // Use connect method to connect to the server
                    client.connect(function(err) {
                        assert.equal(null, err);
                        console.log('Connected successfully to server');

                        const db = client.db(dbName);

                        // client.close();

                        return rs({client,db})
                    });
                }
                catch (e) {
                    return rj(e)
                }
            })
        },
        // hash the password
        generateHash: async (password)=> {
            return new Promise((rs,rj)=>{

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        return rs(hash)
                    });
                });
            })
        },
        validPassword: (password, encrypted)=> {
            return bcrypt.compareSync(password, encrypted);
        }
    }
}