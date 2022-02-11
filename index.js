if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const sequelize = require('./database')

// models
require('./models')

// config vars
const PORT = process.env.PORT | 8000
const HOST = '192.168.0.100'

const app = express()

// app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res) => {
    res.send({ message: 'testing successful.' })
})

app.listen(PORT, HOST, async () => {
    console.log(`server connected to http://${HOST}:${PORT}`)
    await sequelize.sync({
        // alter: true,
        force: true,
    })
})
