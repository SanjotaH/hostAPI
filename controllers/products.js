const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, sort, select } = req.query;
  console.log(
    "🚀 ~ file: products.js ~ line 5 ~ getAllProducts ~ company",
    company
  );
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let apiData = Product.find(queryObject);
  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }
  console.log(queryObject);

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);
  const myProducts = await apiData;
  res.status(200).json({ myProducts, nbHites: myProducts.length });
};

const getAllProductsTesting = async (req, res) => {
  console.log(req.query);
  const myProducts = await Product.find(req.query);
  res.status(200).json({ myProducts, nbßHites: myProducts.length });
};

module.exports = { getAllProducts, getAllProductsTesting };
