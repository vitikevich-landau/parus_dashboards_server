const express = require('express');
const delay = require("../middlewares/delay");
const {list} = require("../controllers/employees");
const router = express.Router();


router.get('/api/employees', delay, list);

module.exports = router;