var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/twincitiestaplist';

router.get('/', function(req, res) {
  console.log("get request");
  // get books from database
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM bars', function(err, result){
      done(); ///close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log("RESULT: ", result.rows);
      res.send(result.rows);
    });

  });
});

module.exports = router;
