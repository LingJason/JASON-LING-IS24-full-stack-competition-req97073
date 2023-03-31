const express = require("express");
const productService = require("../data/service/productService");
const router = express.Router();

// CREATE - post
router.post("/", (req, res) => {
  res.json(productService.addProduct(req.body));
});

// READ - get
router.get("/", (req, res) => {
  res.json(productService.getAllProducts());
});