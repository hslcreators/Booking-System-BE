const express = require("express")
const http = require("http")
const dotenv = require('dotenv')
const app = express()
const server = http.createServer(app)
dotenv.config()
const PORT  = process.env.PORT || 3000


server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})