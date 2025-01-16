function getAllMachines(req, res) {
  res.status(200).json("Get All Machines");
}

function getOneMachine(req, res) {
  res.status(200).json("Get One Machine:", req.params.id);
}

module.exports = { getAllMachines, getOneMachine };
