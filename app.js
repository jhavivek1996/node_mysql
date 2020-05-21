require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;











app.listen(port,()=>{
    console.log(`Server is Listening on ${port}`)
})