var fs = require('fs');
var twilio = require('twilio');
if(!process.env.PRODUCTION){
  var whatever = require('./shhh.js');
  process.env.TWILIO_ACCOUNT_SID = whatever.TWILIO_ACCOUNT_SID;
  process.env.TWILIO_AUTH_TOKEN = whatever.TWILIO_AUTH_TOKEN;
  process.env.TWILIO_NUMBER = whatever.TWILIO_NUMBER;
  process.env.PORT = 3000;
}

var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var express = require('express');
bodyParser = require('body-parser');
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', express.static('./public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/inbound',function(req, res){
  req.body;
  client.sendSms({
      to: req.body.to,
      from: process.env.TWILIO_NUMBER,
      body:'Your kindness warms the room like a space heater in an ice cave'
  }, function(error, message) {
      if (!error) {
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);
          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log('Oops! There was an error.');
          console.log(error);
      }
  });
});
app.get('/favicon.ico', function(req, res){
  fs.readFileSync('./public/favicon.ico', function(data) {
    res.send(data);
  });
});

app.listen(process.env.PORT, function(){
  console.log('listening on 3000');
});
