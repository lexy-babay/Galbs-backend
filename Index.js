const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT

const connectDB = require('./dbconnect/dbconfig')
connectDB()
const app = express()

const bodyparser = require('body-parser')


app.use(bodyparser.urlencoded({extended:false}))

// app.get("*",(req,res)=>{
//     res.send('whoops!! page not found')
//   })
  
    
    
   app.listen(port,()=>{console.log("server started at Port:"+port)})