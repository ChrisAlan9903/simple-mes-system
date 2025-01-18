const getProductionDistribution = `SELECT status, COUNT(*) AS count FROM production_orders GROUP BY status;`;

const getMachineUtilization = `SELECT AVG(utilization_rate) AS machine_utilization FROM machine_utilization;`;

const getDefectRate = `SELECT AVG(defects_count::FLOAT / quantity_inspected) AS defect_rate FROM quality_inspections WHERE inspection_status = 'completed';`;

module.exports = {
  getProductionDistribution,
  getMachineUtilization,
  getDefectRate,
};
