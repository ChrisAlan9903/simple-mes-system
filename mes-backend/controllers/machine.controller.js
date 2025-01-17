const pool = require("../config/db.config");
const queries = require("../db/machine.queries");

function getAllMachines(req, res) {
  pool.query(queries.getAllMachineUtilizations, (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
}

function getOneMachine(req, res) {
  res.status(200).json("Get One Machine:", req.params.id);
}

module.exports = { getAllMachines, getOneMachine };
