var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();
var shortURL = require('./mongodb.js');

app.use(bodyparser.json());
app.use(cors());

//use frontend files
app.use(express.static('public'));
app.get('/',function(req,res,next){
  var fileName = path.join(__dirname + '/views/index.html');
  res.sendFile(fileName,function(err){
    if(err){
      console.log(err);
      res.status(err.statuse).end;
    }else{
      console.log('sendFile:', fileName);
    }
  });
});

//generate a shorten URL
app.get('/new/:urlToShorten',function(req,res,next){
  var urlToShorten = req.params.urlToShorten;
  var returndata;
  var detectRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  if (detectRegex.test(urlToShorten)){
    //detect whether the URL is already in the database
    shortURL.findOne({"originalUrl":urlToShorten},function(err,data){
      if(err){
        res.send(err);
      }
      if(data){
        var dataReturn = "originalUrl: "+data.originalUrl+"    shortUrl: "+data.shortUrl;
        res.json(dataReturn);
      }else{
        var shortNumber = Math.floor(Math.random()*10000).toString();
        console.log(shortNumber);
        var data = new shortURL(
            {
              originalUrl: urlToShorten,
              shortUrl: shortNumber
             });
        data.save(function(err){
           if(err){
             return res.send("Error Saving");
                 }
          })
        return res.json(data);
      }
    });
  }
    else{
    return res.json("Invalid URL, please go back to https://third-odometer.glitch.me");
  }
});

//Redirect shorten URL
app.get('/:shorterURL',function(req,res,next){
  var shorterURL = req.params.shorterURL;
  //search the Database
  shortURL.findOne({"shortUrl": shorterURL},function(err,data){
    if(err){
      res.send(err);
    }else{
      res.redirect(301,"http://"+data.originalUrl);
    }
  });
})

//connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://URLShorten:URLShorten@ds251287.mlab.com:51287/pracdb");

app.listen(process.env.PORT || 8080);

