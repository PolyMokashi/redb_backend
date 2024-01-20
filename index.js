const express = require("express");
const mongoose = require("mongoose");
const donors = require("./Models/donar");
const bloodDetails = require("./Models/bloodDetails");
const cors = require("cors");
// const bloodDetails = require("./Models/blsoodDetails");
const bloodRequest = require("./Models/bloodRequest");
const router = require("./controller/login");
const hospitalDetails = require("./Models/hospitalDetails");
const statusSchema = require("./Models/status");
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


app.delete("/delete/blood/details/:id", async (req, res) => {
  await bloodDetails
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get("/delete/blood/details/:id", async (req, res) => {
  await bloodDetails
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.delete("/delete/request/:id", async (req, res) => {
  await bloodRequest
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
app.delete("/delete/donors/:id", async (req, res) => {
  await donors
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.post("/post/status", async (req, res) => {
  const { id , name, stat}= req.body;
  const status =  new  statusSchema({
          _id:id,
          name:name,
          stat:stat
  })
 
  try {
   await status.save()
   res.status(200).json(status)
 } catch (error) {
   res.json(error);
 }
});

app.get("/get/status", async (req, res) => {
  await statusSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: "error occured" }));
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
app.use("/v1/auth",router);

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
