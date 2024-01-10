const express = require("express");
const mongoose = require("mongoose");
const donors = require("./Models/donar");
const bloodDetails = require("./Models/bloodDetails");
const cors = require("cors");
// const bloodDetails = require("./Models/blsoodDetails");
const bloodRequest = require("./Models/bloodRequest");
const hospitalDetails = require("./Models/hospitalDetails");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 4000;
app.use(express.json());
const url =
  "mongodb+srv://redbcorp:58NqmpTU5u6zH13N@redb.3ulmyu0.mongodb.net/Blood_Bank?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => console.log("database connected succesfully"))
  .catch((err) => console.log(err));

app.get("/get/donors", async (req, res) => {
  await donors
    .find()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: "error occured" }));
});

app.get("/get/bloodbank", async (req, res) => {
  try {
    await bloodDetails
      .find()
      .sort({ _id: -1 })
      .then((data) => res.json(data))
      .catch((err) => res.json({ error: "error occured" }));
  } catch (error) {
    res.json(error);
  }
});

app.get("/get/blood/request", async (req, res) => {
  await bloodRequest
    .find()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: "error occured" }));
});

app.post("/post/new/request", async (req, res) => {
  const data = req.body;

  await bloodRequest
    .create(data)
    .then(() => res.json(data))
    .catch((err) => res.json(err));
});

app.post("/add/new/blood/collection", async (req, res) => {
  const data = req.body;

  await bloodDetails
    .create(data)
    .then(() => res.json(data))
    .catch((err) => res.json(err));
});

//this is for hospital

app.post("/add/new/request/hospital", async (req, res) => {
  const data = req.body;
  try {
    await hospitalDetails
      .create(data)
      .then(() => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});

app.post("/add/new/donors", async (req, res) => {
  const data = req.body;
  try {
    await donors
      .create(data)
      .then(() => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    res.json(error);
  }
});

app.delete("/delete/request/:id", async (req, res) => {
  await bloodRequest
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.post("/post/data", async (req, res) => {
  const data = [];
  try {
    const newDonor = await bloodRequest.insertMany(data);
    res.json(newDonor);
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
