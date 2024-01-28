const express = require('express');
const bodyParser = require('body-parser');
var proxy = require('html2canvas-proxy');
const app = express();
var moment = require('moment');
moment().format();
app.locals.moment = moment;
const mongoose = require("mongoose")
const cors = require("cors");
const path = require("path");

const standsRoute = require('./routers/stands.router.js');
const matchsRoute = require('./routers/matchday.router.js');
const uclRoute = require('./routers/ucl.router.js');
const channelsRoute = require("./routers/live.router.js");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use(standsRoute)
app.use(matchsRoute)
app.use(uclRoute)
app.use(channelsRoute)
app.use('/ucl', proxy());
app.use('/matchday', proxy());  

app.get('/', function(req, res) {
  
  res.render('index.ejs', {
    
  });
});

app.listen(5000, ()=> console.log("listen on 3000"));
