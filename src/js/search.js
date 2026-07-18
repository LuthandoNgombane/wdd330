import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
// Add these imports
import { updateCartBadge, loadHeaderFooter } from "./utils.mjs";

// Initialize the dynamic header/footer and badge immediately
loadHeaderFooter();
updateCartBadge();

const params = new URLSearchParams(window.location.search);
const query = params.get("search") || "";
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

await productList.init();

if (query) {
  productList.search(query);
}