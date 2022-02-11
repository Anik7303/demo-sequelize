if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const { json } = require('express/lib/response')
const sequelize = require('./database')

// initializing model definitions
require('./models')

// fetching defined models
const User = sequelize.model('User')

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

    // Creating instances
    const jane = User.build({ name: 'jane' })
    // jane.name = 'John'
    jane.age = 20
    console.log(`jane instance of User: ${jane instanceof User}`)
    console.log(jane.toJSON())
    console.log(JSON.stringify(jane, null, 4))
    await jane.save()

    // another method that combines build and save
    const john = await User.create({
        name: 'john',
        favoriteColor: 'blue',
        age: 23,
    })

    // Updating instances
    // update several fields at once using set method
    john.set({
        age: 28,
        favoriteColor: 'yellow',
        cash: 20000,
    })
    await john.save()
    // save() here will persist any other changes that have been made on this instance,
    // not just those in the previous set call.
    // to avoid this use update() to update a specific set of fields
    await jane.update({
        age: 25,
        favoriteColor: 'pink',
        cash: 30500,
    })

    // Deleting instances
    await john.destroy()

    // Reloading an instance from the database
    jane.name = 'Ava'
    await jane.reload()
    console.log(jane.name) // 'jane'

    // Saving only some fields using save()
    const anik = await User.create({ name: 'Anik' })
    console.log(anik.name, anik.favoriteColor)
    anik.name = 'Anik II'
    anik.favoriteColor = 'red'
    await anik.save({ fields: ['favoriteColor'] }) // change only favoriteColor field
    console.log({ name: anik.name, 'favorite color': anik.favoriteColor })
    // reloading values from the database
    await anik.reload()
    console.log({ name: anik.name, 'favorite color': anik.favoriteColor })

    // Incrementing and decrementing integer values
    const jason = await User.create({ name: 'jason', age: 22 })
    await jason.increment('age', { by: 1 })
    // or for incrementing by one
    // jason.increment('age')
    await jason.reload()
    console.log(jason.toJSON())

    // incrementing multiple fields
    await jason.increment({
        age: 2,
        cash: 1000,
    })
    await jason.reload()
    console.log(jason.toJSON())

    await jason.decrement({ cash: 20000, age: 2 })
    await jason.reload()
    console.log(jason.toJSON())
})
