const { default: mongoose } = require("mongoose");
const { Login } = require("../models");

mongoose.connect("mongodb://localhost:27017/Website");
var express = require("express");
const { findDocuments } = require("../helpers/MongoDBHelpers");
var router = express.Router();
const COLLECTION_NAME = "logins";
// post Login
router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Login(data);
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

// get Login
router.get("/", (req, res, next) => {
  try {
    Login.find()
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

// get Login id

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    Login.find(id)
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

// patch Login
router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Login.findByIdAndUpdate(id, data, { new: true })
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

// delete Login
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Login.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
});

// search
router.get("/search/email", (req, res, next) => {
  const { text } = req.query;
  const query = { email: new RegExp(`${text}`) };
  const sort = { email: -1 };
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
