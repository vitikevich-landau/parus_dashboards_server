const delay = require('../middlewares/delay');

const express = require('express');
const {
    datatableDetails,
    lineChart,
    pieChart,
    barChart
} = require("../controllers/dashboards/latecomers");
const router = express.Router();


// router.get('/chart/:month/:year', delay, lineChart);
// router.get('/pie/:month/:year', delay, pieChart);
// router.get('/datatable-latecomers');

router.get('/latecomers/line/:day/:month/:year', delay, lineChart);
router.get('/latecomers/pie/:day/:month/:year', delay, pieChart);
router.get('/latecomers/bar/:day/:month/:year', delay, barChart);
router.get('/latecomers/details/:day/:month/:year', delay, datatableDetails);


module.exports = router;