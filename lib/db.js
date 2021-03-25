'use strict'

const sqlize = require('sequelize')
const  {models: allOrms}  = require('../api')
const {Sequelize, Model, DataTypes} = sqlize
const user = process.env.DB_USER;
const host = process.env.DB_HOST
const database = process.env.DB
const password = process.env.DB_PASSWORD
const port = process.env.DB_PORT
const schema = process.env.DB_SCHEMA

module.exports = {
    sequelize: {

        connect: async () => {

            try {

                const sequelize = new Sequelize(database, user, password, {
                    host,
                    port,
                    schema,
                    dialect: 'postgres',
                    logging: true
                });
                const models = {};

                //Build ORMS
                let orms = await Promise.all(
                    Object.keys(allOrms).map(async (orm) => {
                        new Promise((rs, rj) => {
                            models[orm] = allOrms[orm].schema(sequelize, DataTypes)
                            rs()
                        })
                    })
                ).then(async (data) => {
                    sequelize.sync({force: true})
                    return models
                })


                return Promise.resolve({sequelize, orms})
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
}