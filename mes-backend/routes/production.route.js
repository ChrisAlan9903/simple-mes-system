const express = require("express");
const router = express.Router();
const productionController = require("../controllers/production.controller");

router.get("/", productionController.getAllProductions);
router.get("/:productionId", productionController.getOneProduction);
// router.post("/", productionController);
// router.put("/:productionId", productionController.login);
// router.delete("/:productionId", productionController.login);

module.exports = router;
