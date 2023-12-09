//service layer this is for handele busines logic
/*hy are this separated ? so that the responsibilities are isolated
 and the function is reusable */
const prisma = require("../db/index.js");
const {
  findProducts,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
} = require("./productRepository.js");

const getAllProduct = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);
  if (findProduct) {
    throw new Errors("Namehas to be unique");
  }
  const product = await insertProduct(newProductData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);
  await editProduct(id, productData);
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
