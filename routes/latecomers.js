const express = require('express');
const delay = require("../middlewares/delay");
const router = express.Router();
const {list, saveAll, select} = require('../controllers/latecomers');

/* GET users listing. */
router.get('/', delay, list);
router.get('/:month/:year', delay, select);
router.post('/', delay, saveAll);

module.exports = router;
