var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');

const usersRouter = require('./routes/users');
// app.use("/users", usersRouter);            // may have to uncomment this (just to get it working for now)

const postsRouter = require("./routes/post");
// app.use("/posts", postsRouter);            // may have to uncomment this (just to get it working for now)

const commentRouter = require("./routes/comment");


var mongoose = require('mongoose');



const {mongoURI} = require('./keys');
require('./models/user');
mongoose.connect(mongoURI);

mongoose.connection.on('connected', ()=>{
  console.log("Successfully connected to the database")
});
mongoose.connection.on('error', (Error)=>{
  console.log("Error connecting to the database:", Error)
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/posts", postsRouter);
app.use("/comment", commentRouter);

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

module.exports = app;
