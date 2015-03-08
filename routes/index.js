var express = require('express');
var router = express.Router();
var tts = require('node-tts-api');
var config = require('../config');
var twilioClient = require('twilio')(config.accountSid, config.authToken);

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

//send the text message
router.post('/text', function(req, res) {


	//USE FOR TEXT TO SPEECH
	var toSpeech = req.body.message;
	tts.getSpeech(toSpeech, function(error, link) {
	  return console.log(link);
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

module.exports = router;
