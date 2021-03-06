const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;

// Allows app to parse request body
app.use(bodyParser.urlencoded({ extended: true }))

// Allow Cross-Origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// connect to Mongo database configured in db.js
MongoClient.connect(db.url, (err, database) => {

  if (err) return console.log(err)

  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log(`Running on port: ${port}`);
  });
})
