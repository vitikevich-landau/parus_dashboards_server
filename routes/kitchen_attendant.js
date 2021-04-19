const express = require('express');
const delay = require("../middlewares/delay");
const {list, change, changeOrder} = require("../controllers/kitchen_attendant");
const router = express.Router();

router.get('/', delay, list);
router.put('/change/:id', change);
router.post('/change-order', changeOrder);

module.exports = router;