const pool = require("../config/db.config");
const queries = require("../db/inspection.queries");

function getAllInspections(req, res) {
  pool.query(queries.getAllInspections, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

function getOneInspection(req, res) {
  const inspectionId = parseInt(req.params.inspectionId);
  pool.query(queries.getOneInspection, [inspectionId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

function createOneInspection(req, res) {
  const {
    production_order_id,
    inspection_status,
    inspection_date,
    inspector_name,
    result,
    quantity_inspected,
    defects_count,
    remarks,
  } = req.body;

  pool.query(
    queries.createOneInspection,
    [
      production_order_id,
      inspection_status,
      inspection_date,
      inspector_name,
      result,
      quantity_inspected,
      defects_count,
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

function updateOneInspection(req, res) {
  const inspectionId = parseInt(req.params.inspectionId);
  const {
    production_order_id,
    inspection_status,
    inspection_date,
    inspector_name,
    result,
    quantity_inspected,
    defects_count,
    remarks,
  } = req.body;

  const existing = pool.query(
    queries.getOneInspection,
    [inspectionId],
    (error, results) => {
      if (!results.rows.length) {
        return res.status(404).json({
          message: `Quality inspection with id ${inspectionId} does not exists`,
        });
      }
      pool.query(
        queries.updateOneInspection,
        [
          production_order_id,
          inspection_status,
          inspection_date,
          inspector_name,
          result,
          quantity_inspected,
          defects_count,
          remarks,
          inspectionId,
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
function deleteOneInspection(req, res) {
  const inspectionId = parseInt(req.params.inspectionId);
  const existing = pool.query(
    queries.getOneInspection,
    [inspectionId],
    (error, results) => {
      if (!results.rows.length) {
        return res.status(404).json({
          message: `Quality inspection with id ${inspectionId} does not exists`,
        });
      }
      pool.query(
        queries.deleteOneInspection,
        [inspectionId],
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
  getAllInspections,
  getOneInspection,
  createOneInspection,
  updateOneInspection,
  deleteOneInspection,
};
