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

// Returns all data that matches search for scrum master
const getProductByScrumMaster = (query) => {
  const filteredProducts = {};
  for (const [k, v] of Object.entries(mockData)) {
    if (v.scrumMasterName.toLowerCase().includes(query.toLowerCase())) {
      filteredProducts[k] = v;
    }
  }
  return filteredProducts;
};

// Returns all data that matches search for developer
const getProductByDeveloper = (query) => {
  const filteredProducts = {};
  for (const [k, v] of Object.entries(mockData)) {
    if (v.developers.find(developer => developer.toLowerCase().includes(query.toLowerCase()))) {
      filteredProducts[k] = v;
    }
  }
  return filteredProducts;
};


module.exports = {
  addProduct,
  getAllProducts,
  getProductByScrumMaster,
  getProductByDeveloper
};