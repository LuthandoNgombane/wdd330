import { loadHeaderFooter, updateCartBadge, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// =================================================================
// START OF CODE ADDED BY IZUOGU DAVID ONOCHIE
// =================================================================
function initializeLiveSearch() {
  const searchInput = document.querySelector("#search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    const productCards = document.querySelectorAll(".product-list .product-card");

    productCards.forEach((card) => {
      const productText = card.textContent.toLowerCase();
      if (productText.includes(query)) {
        card.style.display = ""; 
      } else {
        card.style.display = "none"; 
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLiveSearch);
} else {
  initializeLiveSearch();
}
// =================================================================
// END OF CODE ADDED BY IZUOGU DAVID ONOCHIE
// =================================================================


loadHeaderFooter();
updateCartBadge();


const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();