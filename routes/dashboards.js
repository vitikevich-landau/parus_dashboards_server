const delay = require('../middlewares/delay');

const express = require('express');
const {lineChart, pieChart} = require('../controllers/dashboards')
const router = express.Router();


router.get('/chart/:month/:year', delay, lineChart);
router.get('/pie/:month/:year', delay, pieChart);
router.get('/datatable-latecomers');


module.exports = router;