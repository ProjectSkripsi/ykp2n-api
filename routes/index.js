const express = require('express');
const router = express.Router();
const user = require('./users');
const file = require('./uploadFile');
const phone = require('./phone');
const symptoms = require('./symptoms');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api/v1/user', user);
router.use('/api/v1/upload', file);
router.use('/api/v1/symptoms', symptoms);
router.use('/api/v1/phone', phone);

module.exports = router;
