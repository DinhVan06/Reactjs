const { default: mongoose } = require("mongoose");
const { Feature } = require("../models");
mongoose.connect("mongodb://localhost:27017/Website");
var express = require("express");
const { findDocuments } = require("../helpers/MongoDBHelpers");
var router = express.Router();
const COLLECTION_NAME = "features";
// post features
router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Feature(data);
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
// get features
router.get("/", (req, res, next) => {
  try {
    Feature.find()
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
// get features id

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    Feature.find(id)
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
// patch features
router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Feature.findByIdAndUpdate(id, data, { new: true })
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
// delete features
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    Feature.findByIdAndDelete(id)
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
// search
router.get("/search/title", (req, res, next) => {
  const { text } = req.query;
  const query = { title: new RegExp(`${text}`) };
  const sort = { title: -1 };
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
