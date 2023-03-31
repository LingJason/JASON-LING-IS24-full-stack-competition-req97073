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

// UPDATE - put
router.put("/:id", (req, res) => {
  res.json(productService.updateProduct(req.params.id, req.body));
});

// UPDATE search based on dropdown - put
router.post("/search", (req, res) => {
  switch (req.body.filter) {
    case "scrumMaster":
      res.json(productService.getProductByScrumMaster(req.body.search));
      break;
    case "developer":
      res.json(productService.getProductByDeveloper(req.body.search));
      break;
  }
});

//DELETE - delete
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  res.json(productService.deleteProduct(id));
});

module.exports = router;
