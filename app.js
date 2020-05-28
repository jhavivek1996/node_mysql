require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.APP_PORT;
const userRouter = require("./api/users/user.router")
var bodyParser = require('body-parser')

app.use(cors())
app.use(express.json());
app.use("/api/users",userRouter)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())







app.listen(port,()=>{
    console.log(`Server is Listening on ${port}`)
})