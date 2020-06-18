require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const userRouter = require("./api/users/user.router")
const cors = require('cors');
app.use(express.json());
app.use("/api/users",userRouter)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "GET,PUT,PATCH,DELETE,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});






app.listen(port,()=>{
    console.log(`Server is Listening on ${port}`)
})