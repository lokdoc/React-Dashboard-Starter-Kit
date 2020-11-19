const express = require('express')
const fs = require('fs')
const path = require('path')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
const logger = require('morgan');
const port = 8080
//const db = require('./queries')

const RestAPI = require('./loader');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
    extended: true,
  })
)
app.use(logger('dev'));

app.use(express.static('./client/build'));
  

app.use( function(req, res,next) 
{
     
    if(req.path.startsWith("/api"))
        next();

    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  
});
 



app.get('*', express.static('./client/build'));
//app.get('*', function(req, res) { res.redirect("/") });

    console.log("LOADING MAIN INDEX")

RestAPI.load(app).then(()=>
{


    app.listen(port, () =>
    {
        console.log(`-------------------------------------------------------
    | ReactJS Dashboard - API-WebService is running on port : ${port}   |
    -------------------------------------------------------`)

  
    })
})


