const { default: mongoose } = require("mongoose");
const { Product } = require("../models");

mongoose.connect("mongodb://localhost:27017/Website");
var express = require("express");
const { findDocuments } = require("../helpers/MongoDBHelpers");
var router = express.Router();
const COLLECTION_NAME = "products";
// post Product
router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Product(data);
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

// get Product
router.get("/", (req, res, next) => {
  try {
    Product.find()
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

// get Product id

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    Product.find(id)
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

// patch Product
router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Product.findByIdAndUpdate(id, data, { new: true })
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

// delete Product
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
});

// search
router.get("/search/name", (req, res, next) => {
  const { text } = req.query;
  const query = { name: new RegExp(`${text}`) };
  const sort = { name: -1 };
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
