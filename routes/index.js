var path = require('path');
var express = require('express');
var router = express.Router();
var tts = require('node-tts-api');
var config = require('../config');
var twilioClient = require('twilio')(config.accountSid, config.authToken);
var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

//send the text message
router.post('/call', function(req, res) {

	//USE FOR TEXT TO SPEECH
	var file = fs.createWriteStream("./public/lyrics.mp3");
	var toSpeech = req.body.textMessage;
	tts.getSpeech(toSpeech, function(error, link) {
	  var request = http.get(link, function(response) {
	    response.pipe(file);
	  });
	});
	
	twilioClient.makeCall({
	    to: "+1" + req.body.phoneNumber,
	    from: config.twilioNumber,
	    applicationSid: config.applicationSid
	}, function(err, message) {
	    if (err) {
	    	console.log(err);
	        res.status(500).send(err);
	    } else {
	        res.send({
	            message: 'You will receive a phone call shortly.'
	        });
	    }
	});

});

router.post('/phonecall', function(req, res) {
    res.set({
        'Content-Type':'text/xml'
    });

    exec('ffmpeg -i public/lyrics2.mp3 -i public/indaclub.mp3 -filter_complex amerge -c:a libmp3lame -q:a 4 public/output1.mp3', function (e, sto, ste) { 
      console.log(e, sto, ste)
    })
    res.sendFile(path.resolve(__dirname + '/../views/phonecall.xml'));
});

module.exports = router;
