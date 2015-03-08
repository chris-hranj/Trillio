var express = require('express');
var router = express.Router();
var meSpeak = require("mespeak")

/* GET home page. */
router.get('/', function(req, res) {
  mespeak.speak("EAT A DICK.");
  res.render('index', { title: 'Express' });
});

module.exports = router;
