const { DataTypes } = require('sequelize')

const sequelize = require('../database')

// const User = sequelize.define(
sequelize.define(
    'User',
    {
        name: DataTypes.STRING,
        favoriteColor: {
            type: DataTypes.STRING,
            defaultValue: 'green',
        },
        age: DataTypes.INTEGER,
        cash: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    { timestamps: true }
)
