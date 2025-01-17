const getAllInspections = `SELECT * FROM quality_inspections`;

const getOneInspection = `SELECT * FROM quality_inspections WHERE id = $1`;

const createOneInspection = `INSERT INTO quality_inspections(production_order_id, inspection_status, inspection_date, inspector_name, result, quantity_inspected, defects_count, remarks) 
    VALUES($1, $2, $3, $4, $5, $6, $7 , $8)`;

const updateOneInspection = `UPDATE quality_inspections 
    SET 
    production_order_id = $1,
    inspection_status = $2,
    inspection_date = $3,
    inspector_name = $4,
    result = $5,
    quantity_inspected = $6,
    defects_count = $7,
    remarks = $8
    WHERE id = $9`;

const deleteOneInspection = "DELETE FROM quality_inspections WHERE id = $1";

module.exports = {
  getAllInspections,
  getOneInspection,
  createOneInspection,
  deleteOneInspection,
  updateOneInspection,
  deleteOneInspection,
};
