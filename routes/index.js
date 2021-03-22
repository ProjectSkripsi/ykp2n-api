const express = require('express');
const router = express.Router();
const user = require('./users');
const file = require('./uploadFile');
const phone = require('./phone');
const symptoms = require('./symptoms');
const patient = require('./patient');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api/v1/user', user);
router.use('/api/v1/upload', file);
router.use('/api/v1/symptoms', symptoms);
router.use('/api/v1/patient', patient);

// router.use('/api/v1/phone', phone);

module.exports = router;
