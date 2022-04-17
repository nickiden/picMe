var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require("./routes/post");
const commentRouter = require("./routes/comment");


var mongoose = require('mongoose');

var app = express();

const {mongoURI} = require('./keys');
require('./models/user');
mongoose.connect(mongoURI)
  .then(client => {
    const db = client.db('pics');
    const collection = db.collection('images');
    app.locals.imageCollection = collection;
  });

mongoose.connection.on('connected', ()=>{
  console.log("Successfully connected to the database")
});
mongoose.connection.on('error', (Error)=>{
  console.log("Error connecting to the database:", Error)
});

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const upload = multer({
  storage: multerS3({
      s3,
      acl: 'public-read',
      bucket: 'picme-bucket2',
      metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${uuid()}${ext}`);
      }
  })
});

app.post('/upload', upload.single('appImage'), (req, res) => {
  const imageCollection = req.app.locals.imageCollection;
  const uploadedFile = req.file.location;
  imageCollection.insert({ filePath: uploadedFile })
      .then(result => {
          return res.json({ status: 'OK', ...result });
      })
});

app.get('/images', (req, res) => {
  const imageCollection = req.app.locals.imageCollection;
  imageCollection.find({})
      .toArray()
      .then(images => {
          const paths = images.map(({ filePath }) => ({ filePath}) );
          res.json(paths);
      });
});expo

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware routing
app.use('/', indexRouter);
app.use("/users", usersRouter);
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
