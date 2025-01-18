const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/statistic.controller");

router.get("/product-distribution", statisticController.getProductDistribution);
router.get("/machine-utilization", statisticController.getMachineUtilization);
router.get("/defect-rate", statisticController.getDefectRate);

module.exports = router;
