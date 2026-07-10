import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Read the search text from the URL
const params = new URLSearchParams(window.location.search);
const query = params.get("search") || "";

// Use the tents data
const dataSource = new ProductData("tents");

// Find the product list on the page
const listElement = document.querySelector(".product-list");

// Create the ProductList object
const productList = new ProductList("tents", dataSource, listElement);

// Load products
await productList.init();

// Filter the products
if (query) {
  productList.search(query);
}