var express = require('express');
var router = express.Router();

var DB = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kompas Code Challenge' });
});

router.get('/users', function(req, res, next) {
  DB.getCollection('users', function(users) {
    res.json(users);
  })
});

router.get('/places', function(req, res, next) {
  DB.getCollection('places', function(places) {
    res.json(places);
  })
});

router.get('/createTestData', function(req, res, next) {
  DB.createData();
  res.send('Data créée avec succès');
});

router.post('/sent', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
