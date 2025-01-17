const express = require("express");
const router = express.Router();
const productionController = require("../controllers/production.controller");

router.get("/", productionController.getAllProductions);
router.get("/:productionId", productionController.getOneProduction);
router.post("/", productionController.createOneProduction);
router.put("/:productionId", productionController.updateOneProduction);
router.delete("/:productionId", productionController.deleteOneProduction);

module.exports = router;
