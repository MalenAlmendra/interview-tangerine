require('dotenv').config()
require('./config/db')
const {urlencoded,json}= require('body-parser')
const express= require('express')
const app=express()
const cors=require('cors')
const PORT=process.env.NODE_ENV=='development'? process.env.PORT : 5151

//middlewares
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors())

//routes
app.use('/users',require('./routes/users'))

app.listen(PORT,process.env.HOST,()=>{
    console.log('Server on port',PORT)
})