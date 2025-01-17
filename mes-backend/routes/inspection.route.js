const express = require("express");
const router = express.Router();
const inspectionController = require("../controllers/inspection.controller");

router.get("/", inspectionController.getAllInspections);
router.get("/:inspectionId", inspectionController.getOneInspection);
router.post("/", inspectionController.createOneInspection);
router.put("/:inspectionId", inspectionController.updateOneInspection);
router.delete("/:inspectionId", inspectionController.deleteOneInspection);

module.exports = router;
