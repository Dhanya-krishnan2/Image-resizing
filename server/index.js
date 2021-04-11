const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');

// requiring all the necessary packages
const app = express();

// mongoose connection the local host and img is the name  and passing all 
// object details 
// console.log(userRoutes);
mongoose.connect('mongodb://127.0.0.1:27017/img', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
// it is the way to get all the promises
// console.log(mongoose.Promise);

//check connection
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to mongoDB');
});

//check for DB errors
db.on('error', () => {
  console.log('Get errors while connected to mongoDB');
});

mongoose.Promise = global.Promise;
const directory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(directory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
// to connect server and client in the different port and json format
//setup access-control-allow-origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Reequested-With, Content-type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api', userRoutes);

//For 500 - Error
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    error: error,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server has started on port ' + PORT);
});
