require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const port = 3000
const app = express() 

//models
require('./src/models/tollSchema') 

//routes
const tollRoutes = require('./src/routes/tollRoutes') 


app.use(bodyParser.json())
app.use(tollRoutes)


//connect db
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo instance')
})
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to Mongo instance', error)
})
  
// connect server
app.listen(port, ()=>{
    console.log('Listening on this port', port )
})
