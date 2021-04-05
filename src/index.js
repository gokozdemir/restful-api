const express = require('express');
const mongoose = require('mongoose');
require('../dbMongo/dbConnection')
const errorMiddleware = require('../dbMongo/middleware/errorMiddleware')

//ROUTES
const userRouter = require('../router/userRouter');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.status(200).json({title: "Hello"})
})

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('3000 portundan server ayaklandı.')
})