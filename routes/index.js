var path = require('path');
var express = require('express');
var router = express.Router();
var tts = require('node-tts-api');
var config = require('../config');
var twilioClient = require('twilio')(config.accountSid, config.authToken);
var http = require('http');
var fs = require('fs');
var XMLWriter = require('xml-writer');

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

	//send text via twilio.
    // twilioClient.sendSms({
    //     to: "+1" + req.body.phoneNumber,
    //     from: config.twilioNumber,
    //     body: req.body.message,
    //     applicationSid: config.applicationSid
    // }, function(err, message) {
    //     if (err) {
    //     	console.log(err);
    //         res.status(500).send(err);
    //     } else {
    //         res.send({
    //             message: 'Your message is being processed.'
    //         });
    //     }
    // });
});

router.post('/phonecall', function(req, res) {
    res.set({
        'Content-Type':'text/xml'
    });
    xw = new XMLWriter;
    xw.startDocument('1.0', 'UTF-8').startElement('Response').writeElement('Play', 'http://5201bdac.ngrok.com/lyrics.mp3');
    //console.log(xw.toString());
    res.send(xw.toString());
});

module.exports = router;
