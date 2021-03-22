const express = require('express');
const router = express.Router();
const {
  addNew,
  getAllPagination,
  deleteSymptoms,
  updateSymptoms,
  getById,
  getAll,
} = require('../controllers/symptomsController');
const { isLogin } = require('../middlewares/auth');

router.get('/all', getAll);
router.post('/', isLogin, addNew);
router.get('/:pageSize/:currentPage', isLogin, getAllPagination);
router.delete('/:_id', isLogin, deleteSymptoms);
router.put('/:codes', isLogin, updateSymptoms);
router.get('/:_id', isLogin, getById);

module.exports = router;
