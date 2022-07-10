const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var bodyParser = require('body-parser');
const db=require('./src/models/index')
require('dotenv').config();

const {isAuthenticRequest} = require("./src/Middleware/apiAuth")


const i18n = require('./src/i18n/i18n')

// route Name import and declaration goes here
const batteryRouter = require('./src/routes/Routes');
const userRouter=require('./src/routes/Api')
// const invetoryRouter = require("./src/Inventory/routes/index.js")
//check

const app = express();

const cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(i18n)

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes to be declared here
app.use('/battery', batteryRouter);
app.use('/user',userRouter)
// app.use('/inventory', invetoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.sequelize.authenticate()
  .then(function(i){
    console.log('Connection has been established successfully.');
  }).catch(function(err){
    console.log(err)
  })

module.exports = app;