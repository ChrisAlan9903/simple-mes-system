const express = require("express");
const router = express.Router();
const machineController = require("../controllers/machine.controller");

router.get("/", machineController.getAllMachines);
router.get("/:machineId", machineController.getOneMachine);
// router.post("/", machineController.login);
// router.put("/:machineId", machineController.login);
// router.delete("/:machineId", machineController.login);

module.exports = router;
