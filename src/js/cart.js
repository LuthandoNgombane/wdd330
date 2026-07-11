import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");

  // Display a message if the cart is empty
  if (cartItems.length === 0) {
    productList.innerHTML = `
      <li class="cart-card divider">
        <p>Your cart is empty.</p>
      </li>
    `;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  productList.innerHTML = htmlItems.join("");

  attachQuantityListeners();
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
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

      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
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
    });
  });
}

renderCartContents();