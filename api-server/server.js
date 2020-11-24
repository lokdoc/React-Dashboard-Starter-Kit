const express = require('express')
const fs = require('fs')
const path = require('path')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
const logger = require('morgan');
const cors = require('cors');
const config = require('./config.json');
const port = config.port
//const db = require('./queries')

const RestAPI = require('./loader');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
    extended: true,
  })
)
app.use(logger('dev'));
app.use(cors());


app.get("/",function(req,res){

    res.status(200)
    .end("React-Dashboard-Starter-Kit API v0.1")
})

RestAPI.load(app).then(()=>
{


    app.listen(port, () =>
    {
        console.log(`-------------------------------------------------------
    | ReactJS Dashboard - API-WebService is running on port : ${port}   |
    -------------------------------------------------------`)

  
    })
})


