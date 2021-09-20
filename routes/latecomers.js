const express = require('express');
const delay = require("../middlewares/delay");
const router = express.Router();
const {list, saveAll, select, setPeriod, checkPeriod} = require('../controllers/latecomers');

/* GET users listing. */
router.get('/', delay, list);
router.get('/:month/:year', delay, select);
router.post('/', delay, saveAll);
router.get('/check-period/:start_date/:end_date/:employee', delay, checkPeriod);
router.post('/period', delay, setPeriod);


module.exports = router;
