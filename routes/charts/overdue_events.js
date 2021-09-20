const delay = require('../../middlewares/delay');

const express = require('express');
const {gageChart, complexChart} = require("../../controllers/dashboards/overdue_events");
const router = express.Router();

router.get('/gage/:day/:month/:year/:type', delay, gageChart);
router.get('/complex/:day/:month/:year', delay, complexChart);


module.exports = router;