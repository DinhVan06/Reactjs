const { default: mongoose } = require("mongoose");
const { Employee } = require("../models");

mongoose.connect("mongodb://localhost:27017/Website");
var express = require("express");
const { findDocuments } = require("../helpers/MongoDBHelpers");
var router = express.Router();
const COLLECTION_NAME = "employees";
// post Employee
router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Employee(data);
    newItem
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.status(500);
  }
});

// get Employee
router.get("/", (req, res, next) => {
  try {
    Employee.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.status(500);
  }
});

// get Employee id

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    Employee.find(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.status(500);
  }
});

// patch Employee
router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Employee.findByIdAndUpdate(id, data, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.status(500);
  }
});

// delete Employee
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Employee.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
});

// search
router.get("/search/fullname", (req, res, next) => {
  const { text } = req.query;
  const query = { fullName: new RegExp(`${text}`) };
  const sort = { fullName: -1 };
  const limit = 5;
  const skip = 1;
  const object = {};
  findDocuments(query, COLLECTION_NAME, sort, limit, skip, object)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
