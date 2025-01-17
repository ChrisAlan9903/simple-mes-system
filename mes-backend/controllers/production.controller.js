const pool = require("../config/db.config");
const queries = require("../db/production.queries");

function getAllProductions(req, res) {
  pool.query(queries.getAllProductions, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

function getOneProduction(req, res) {
  const productionId = parseInt(req.params.productionId);
  pool.query(queries.getOneProduction, [productionId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

function createOneProduction(req, res) {
  const {
    product_name,
    quantity,
    start_date,
    expected_end_date,
    actual_end_date,
    status,
    remarks,
  } = req.body;

  pool.query(
    queries.createOneProduction,
    [
      product_name,
      quantity,
      start_date,
      expected_end_date,
      actual_end_date,
      status,
      remarks,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ status: "success" });
    }
  );
}

function updateOneProduction(req, res) {
  const productionId = parseInt(req.params.productionId);
  const {
    product_name,
    quantity,
    start_date,
    expected_end_date,
    actual_end_date,
    status,
    remarks,
  } = req.body;

  const existing = pool.query(
    queries.getOneProduction,
    [productionId],
    (error, results) => {
      if (!results.rows.length) {
        return res.status(404).json({
          message: `Production with id ${productionId} does not exists`,
        });
      }
      pool.query(
        queries.updateOneProduction,
        [
          product_name,
          quantity,
          start_date,
          expected_end_date,
          actual_end_date,
          status,
          remarks,
          productionId,
        ],
        (error, results) => {
          if (error) {
            throw error;
          }
          return res.status(200).json({ status: "success" });
        }
      );
    }
  );
}
function deleteOneProduction(req, res) {
  const productionId = parseInt(req.params.productionId);
  const existing = pool.query(
    queries.getOneProduction,
    [productionId],
    (error, results) => {
      if (!results.rows.length) {
        return res.status(404).json({
          message: `Production with id ${productionId} does not exists`,
        });
      }
      pool.query(
        queries.deleteOneProduction,
        [productionId],
        (error, results) => {
          if (error) {
            throw error;
          }
          return res.status(200).json({ status: "success" });
        }
      );
    }
  );
}
module.exports = {
  getAllProductions,
  getOneProduction,
  createOneProduction,
  updateOneProduction,
  deleteOneProduction,
};
