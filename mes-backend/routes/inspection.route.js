const express = require("express");
const router = express.Router();
const inspectionController = require("../controllers/inspection.controller");

router.get("/", inspectionController.getAllInspections);
router.get("/:inspectionId", inspectionController.getOneInspection);
// router.post("/", inspectionController.login);
// router.put("/:inspectionId", inspectionController.login);
// router.delete("/:inspectionId", inspectionController.login);

module.exports = router;
