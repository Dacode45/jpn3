var express = require('express');
var router = express.Router();
var fs = require('fs');

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}
var path = String(__dirname);var path =__dirname+"";
var path = path.replace("routes",'data/members.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  readJSONFile(path, function(err, json){
    if(err){
      err.status = 500;
      next(err);
    }else{
      res.json(json);
    }
  });
});

module.exports = router;
