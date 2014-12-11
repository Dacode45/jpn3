var express = require('express');
var fs = require('fs');
var router = express.Router();
/* GET home page. */

//terrible function but placeholder
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function makeImgName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 30; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

router.post('/image', function(req, res){

  try{
    var img = decodeBase64Image(req.body.imgBase64);
    var type = img.type.replace('image/', '');
    var name;
    if(req.body.name){
      name = req.body.name;
    }else
      name = makeImgName();
    var name = "public/img/"+name+'.' + type;
    fs.writeFile(name, img.data);
    res.send({link:name.replace('public/', '')});
  }catch(e){
    res.send(500, "Cant interpret image");
  }
});

router.get('/gallery', function(req, res){
  var images = fs.readdirSync("public/img/gallery");
  res.send(images);
});

router.get('/', function(req, res) {
  res.render('layout', { title: 'Express' });
});





module.exports = router;
