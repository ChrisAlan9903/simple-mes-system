function getAllInspections(req, res) {
  res.status(200).json("Get All Inspections");
}

function getOneInspection(req, res) {
  res.status(200).json({ "Get One Inspection:": req.params.id });
}

module.exports = { getAllInspections, getOneInspection };
