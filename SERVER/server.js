const express = require('express')
const fs = require('fs')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
const logger = require('morgan');
const port = 1010
//const db = require('./queries')

const RestAPI = require('./loader');


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
    extended: true,
  })
)
app.use(logger('dev'));

app.get('/', (request, response) => 
{
    // Default Route (index)

    response.header("Access-Control-Allow-Origin", "*");
    response.status(200).write("ReactJS Dashboard - WebService v0.1 - ALPHA")
    response.end();
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

