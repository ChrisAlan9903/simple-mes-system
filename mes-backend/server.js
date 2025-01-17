const express = require("express");
const app = express();
const port = 8000;

// Define Routes
const productionRoute = require("./routes/production.route");
const machineRoute = require("./routes/machine.route");
const inspectionRoute = require("./routes/inspection.route");

// Middleware
app.use(express.json());

app.use("/productions", productionRoute);
app.use("/machines", machineRoute);
app.use("/inspections", inspectionRoute);

app.get("/", (req, res) => {
  res.status(200).send("Health OK");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port} 🚀`);
});
