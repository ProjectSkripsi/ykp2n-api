const express = require('express');
const router = express.Router();
const {
  addPatient,
  getPatients,
  deletePatient,
} = require('../controllers/patientController');
const { isLogin, isAdmin } = require('../middlewares/auth');

router.post('/', isLogin, addPatient);
router.get('/:pageSize/:currentPage', isLogin, isAdmin, getPatients);
router.delete('/:_id', isLogin, isAdmin, deletePatient);
// router.get('/all', getAll);
// router.put('/:codes', isLogin, updateSymptoms);
// router.get('/:_id', isLogin, getById);

module.exports = router;
