'use strict'

module.exports = {
    schema : (sequelize, DataTypes)=>{
        let { STRING, INTEGER, DATE } = DataTypes

        return sequelize.define('Sales',
            {
                username:{
                    type: STRING,
                    allowNull:false
                },
                amount:{
                    type:INTEGER,
                    allowNull:false
                },
                date:{
                    type:DATE,
                    allowNull:false
                }
            },
            {
                underscored:true,
                paranoid: true,
                tableName:'sales'
            })
    }
}