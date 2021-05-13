const express = require('express');
const delay = require("../middlewares/delay");
const {arrivalList, leaveList, update, insert, remove} = require("../controllers/timesheet");
const router = express.Router();

router.get('/arrival', delay, arrivalList);
router.put('/arrival/:id', update);
router.post('/arrival', insert);
router.delete('/arrival/:id', remove);

router.get('/leave', delay, leaveList);
router.put('/leave/:id', update);
router.post('/leave', insert);
router.delete('/leave/:id', remove);

module.exports = router;