import { loadHeaderFooter, updateCartBadge } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
updateCartBadge();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

// Calculate shipping/tax when user leaves or inputs zip code
const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", () => {
    if (zipInput.value.trim() !== "") {
      myCheckout.calculateOrderTotal();
    }
  });
}

// Handle Form Submission
const form = document.querySelector("#checkout-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    myCheckout.checkout(form);
  });
}