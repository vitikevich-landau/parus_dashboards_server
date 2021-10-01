const express = require('express');
const delay = require("../middlewares/delay");
const {
  jambsList,
  coeffsList,
  coeffsUpdate,
  jambsFill,
  jambsUpdate
} = require("../controllers/losers_info");
const router = express.Router();

router.get(`/:month/:year`, jambsList);
router.post(`/fill`, jambsFill);
router.post(`/update`, jambsUpdate);

router.get(`/coeffs/:month/:year`, delay, coeffsList);
router.post(`/coeffs/update`, delay, coeffsUpdate);

module.exports = router;