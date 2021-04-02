const express = require('express');
const mongoose = require('mongoose');
require('../dbMongo/dbConnection')

//ROUTES
const userRouter = require('../router/userRouter');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.status(200).json({title: "Hello"})
})

app.get('/:id', (req, res) => {
    res.status(200).json({ 'id': req.params.id })
})

app.post('/', (req, res) => {
    res.status(200).json(req.body);
})


app.listen(3000, () => {
    console.log('3000 portundan server ayaklandı.')
})