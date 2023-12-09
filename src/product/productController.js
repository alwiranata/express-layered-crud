//Ini adalah layer untuk handel layer dan respon
//dan handle validasi body

const express = require("express");
const router = express.Router();
const prisma = require("../db/index.js");
const {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./productService.js");
const { findProductById } = require("./productRepository.js");

//get all
router.get("/", async (req, res) => {
  const products = await getAllProduct();
  res.send(products);
});

//get id
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(parseInt(productId));

    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//post product
router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "create product succes",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete product
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id; // string
    await deleteProductById(parseInt(productId));
    res.send("Prodcut delete success");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//put product
router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productdata = req.body;
  if (
    !(
      productdata.image &&
      productdata.name &&
      productdata.price &&
      productdata.description
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  const product = await editProductById(parseInt(productId), productdata);

  res.send({
    data: product,
    message: "Edit Product Success",
  });
});

//pacht product
router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await editProductById(parseInt(productId), productData);
    res.send({
      data: product,
      message: "Edit Product Success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
