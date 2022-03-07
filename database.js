const { Sequelize } = require("sequelize");

// Option 01: Using Connection URI
// const DB_URI = `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

// const sequelize = new Sequelize(DB_URI, {
//     timezone: process.env.DB_TIMEZONE,
//     logging: console.log,
//     // logging: (...msg) => console.log(msg)
// })

// Option 02: Using separate parameters

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.DB_TIMEZONE,
    logging: console.log,
    // logging: (...msg) => console.log(msg),
  }
);

// const sequelize = new Sequelize({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIALECT,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     timezone: process.env.DB_TIMEZONE,
//     // logging: console.log,
//     // logging: (...msg) => console.log(msg),
// })

module.exports = sequelize;
