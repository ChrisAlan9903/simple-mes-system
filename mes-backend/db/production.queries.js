const getAllProductions = `SELECT * FROM production_orders`;

const getOneProduction = `SELECT * FROM production_orders WHERE id = $1`;

const createOneProduction = `INSERT INTO production_orders(product_name, quantity, start_date, expected_end_date, actual_end_date, status, remarks) 
    VALUES($1, $2, $3, $4, $5, $6, $7)`;

const updateOneProduction = `UPDATE production_orders 
    SET product_name = $1, 
    quantity = $2, 
    start_date = $3, 
    expected_end_date = $4,
    actual_end_date = $5,
    status = $6,
    remarks = $7
    WHERE id = $8`;

const deleteOneProduction = "DELETE FROM production_orders WHERE id = $1";

module.exports = {
  getAllProductions,
  getOneProduction,
  createOneProduction,
  deleteOneProduction,
  updateOneProduction,
  deleteOneProduction,
};
