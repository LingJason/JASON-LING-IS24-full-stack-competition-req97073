const {mockData} = require("../mock/mockData");

// Create a 6 digit random unique number and assigned it as a key to newProduct
const addProduct = (newProduct) => {
  const id = Math.floor(100000 + Math.random() * 900000).toString();
  mockData[id] = newProduct;
  return id;
};
// Returns all mockData
const getAllProducts = () => {
  return mockData;
};


module.exports = {
  addProduct,
  getAllProducts,
};