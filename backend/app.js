// here we are creating the app using express

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const Admin = require('./routes/Admin/base') ;

// creating the express object
const app = express();

// using the modules in app
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



//creatint the route
app.use('/admin',Admin)
module.exports = app;