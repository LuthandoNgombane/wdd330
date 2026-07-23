import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Week 2 - Individual Assignment
import { updateCartBadge, loadHeaderFooter } from "./utils.mjs";

// Load shared header and footer
loadHeaderFooter();

// Update shopping cart badge
updateCartBadge();

// ===============================
// Promotional Alert Configuration
// ===============================
const promotion = {
  title: "🔥 Summer Camping Sale!",
  message:
    "Save 20% on all camping tents this week only. Shop now before the offer ends!",
  buttonText: "Shop Now",
  buttonLink: "/product_listing/index.html?category=tents",
};

// Display promotional alert
function showPromotion() {
  const alert = document.getElementById("promo-alert");

  // Stop if the alert container doesn't exist
  if (!alert) return;

  // Don't show again if the user previously dismissed it
  if (localStorage.getItem("promo-dismissed") === "true") {
    return;
  }

  document.getElementById("promo-title").textContent = promotion.title;
  document.getElementById("promo-message").textContent = promotion.message;

  const link = document.getElementById("promo-link");
  link.textContent = promotion.buttonText;
  link.href = promotion.buttonLink;

  alert.classList.remove("hidden");

  document
    .getElementById("close-alert")
    .addEventListener("click", () => {
      alert.classList.add("hidden");
      localStorage.setItem("promo-dismissed", "true");
    });
}

// Initialize promotion
showPromotion();

// ===============================
// Product Listing
// ===============================
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList(
  "tents",
  dataSource,
  listElement
);

productList.init();