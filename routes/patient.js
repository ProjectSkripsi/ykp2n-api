const express = require('express');
const router = express.Router();
const { addPatient, getPatients } = require('../controllers/patientController');
const { isLogin } = require('../middlewares/auth');

router.post('/', isLogin, addPatient);
router.get('/:pageSize/:currentPage', isLogin, getPatients);
// router.get('/all', getAll);
// router.delete('/:_id', isLogin, deleteSymptoms);
// router.put('/:codes', isLogin, updateSymptoms);
// router.get('/:_id', isLogin, getById);

module.exports = router;
