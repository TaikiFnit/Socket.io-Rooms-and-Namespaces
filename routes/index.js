var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/match', function(req, res, next) {
  res.render('match');
});

router.get('/scoreCard', function(req, res, next) {
  res.render('scoreCard');
});

module.exports = router;
