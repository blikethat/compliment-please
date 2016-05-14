var twilio = require('twilio'),
client = twilio('cfg.accountSid', 'cfg.authToken'),
var express = require('express'),
bodyParser = require('body-parser'),
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/inbound',function(req, res){
  req.body;
  client.sendSms({
      to:'+15597089066',
      from:'19492983824',
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
