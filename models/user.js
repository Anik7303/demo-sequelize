const { DataTypes, Model } = require('sequelize')

const { sequelize } = require('../database')

// const User = sequelize.define(
//     'User',
//     {
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         lastName: DataTypes.STRING,
//     },
//     {
//         timestamps: true,
//         // freezeTableName: true,
//         // tableName: 'Users', // change table name
//         // createdAt: false,
//         // updatedAt: false,
//         // updatedAt: 'updateTimestamp', // change 'updatedAt' column name
//     }
// )

class User extends Model {
    getFullName() {
        return [this.firstName, this.lastName].join(' ')
    }

    static classLevelMethod() {
        return 'ClassLevelMethod'
    }

    instanceLevelMethod() {
        return 'InstanceLevelMethod'
    }
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
        },
    },
    {
        sequelize, // 'sequelize' have to be passed
        modelName: 'User',
        // tableName: 'Users',
        // timestamps: true,
        // createdAt: false,
        // updatedAt: 'lastChanged',
    }
)

const user = User.build({ firstName: 'Anik', lastName: 'Mohammad' })
console.log(User.classLevelMethod())
console.log({ name: user.getFullName() })
console.log(user.instanceLevelMethod())
