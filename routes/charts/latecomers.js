const delay = require('../../middlewares/delay');

const express = require('express');
const {
    datatableDetails,
    lineChart,
    pieChart,
    barChart
} = require("../../controllers/dashboards/latecomers");
const router = express.Router();


router.get('/line/:day/:month/:year', delay, lineChart);
router.get('/pie/:day/:month/:year', delay, pieChart);
router.get('/bar/:day/:month/:year', delay, barChart);
router.get('/details/:day/:month/:year', delay, datatableDetails);


module.exports = router;