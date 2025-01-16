function getAllProductions(req, res) {
  res.status(200).json("Get All Productions");
}

function getOneProduction(req, res) {
  res.status(200).json("Get One Production:" + req.params.productionId);
}

module.exports = { getAllProductions, getOneProduction };
