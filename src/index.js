const express = require("express");
const dotenv = require("dotenv");

const app = express();
const productController = require("./product/productController");

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/products", productController);
app.listen(PORT, () => {
  console.log("express API running in port :" + PORT);
});
