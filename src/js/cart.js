import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartBadge, loadHeaderFooter } from "./utils.mjs";

// Initialize page
loadHeaderFooter();
updateCartBadge();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  // Display message if cart is empty
  if (cartItems.length === 0) {
    productList.innerHTML = `
      <li class="cart-card divider">
        <p>Your cart is empty.</p>
      </li>
    `;

    document.getElementById("cart-total").textContent = "$0.00";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);

  productList.innerHTML = htmlItems.join("");

  // Calculate cart total
  calculateCartTotal(cartItems);

  attachQuantityListeners();
  attachRemoveListeners();
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">

      <span class="cart-card__remove" data-id="${item.Id}" title="Remove Item">
        ✖
      </span>

      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>

      <p class="cart-card__quantity">
        Qty:
        <input
          class="cart-qty"
          type="number"
          min="1"
          value="${item.quantity || 1}"
          data-id="${item.Id}"
        >
      </p>

      <p class="cart-card__price">
        $${Number(item.FinalPrice).toFixed(2)}
      </p>

    </li>
  `;
}

// NEW FUNCTION
function calculateCartTotal(cartItems) {

  const total = cartItems.reduce((sum, item) => {

    const quantity = item.quantity || 1;

    return sum + (Number(item.FinalPrice) * quantity);

  }, 0);

  const totalElement = document.getElementById("cart-total");

  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

function attachQuantityListeners() {

  const inputs = document.querySelectorAll(".cart-qty");

  inputs.forEach((input) => {

    input.addEventListener("change", (event) => {

      const id = event.target.dataset.id;

      const quantity = Math.max(1, Number(event.target.value));

      const cartItems = getLocalStorage("so-cart") || [];

      const item = cartItems.find((product) => product.Id === id);

      if (item) {
        item.quantity = quantity;
      }

      setLocalStorage("so-cart", cartItems);

      renderCartContents();

      updateCartBadge();

    });

  });

}

function attachRemoveListeners() {

  const removeButtons = document.querySelectorAll(".cart-card__remove");

  removeButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      const idToRemove = event.target.dataset.id;

      let cartItems = getLocalStorage("so-cart") || [];

      cartItems = cartItems.filter((item) => item.Id !== idToRemove);

      setLocalStorage("so-cart", cartItems);

      renderCartContents();

      updateCartBadge();

    });

  });

}

renderCartContents();