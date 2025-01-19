const pool = require("../config/db.config");
const queries = require("../db/statistic.queries");

function getProductDistribution(req, res) {
  pool.query(queries.getProductionDistribution, (error, results) => {
    if (error) {
      throw error;
    }

    const formattedRows = results.rows.map((row) => ({
      status: row.status,
      count: parseInt(row.count, 10),
    }));
    res.status(200).json(formattedRows);
  });
}

function getMachineUtilization(req, res) {
  pool.query(queries.getMachineUtilization, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

function getDefectRate(req, res) {
  pool.query(queries.getDefectRate, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

module.exports = {
  getProductDistribution,
  getMachineUtilization,
  getDefectRate,
};
