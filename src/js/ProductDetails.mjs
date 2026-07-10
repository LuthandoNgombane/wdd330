import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get the current product
    this.product = await this.dataSource.findProductById(this.productId);

    // Display the product
    this.renderProductDetails();

    // Add event listener to the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Get current cart or create an empty one
    let cartItems = getLocalStorage("so-cart") || [];

    // Check if this product already exists
    const existingItem = cartItems.find(
      (item) => item.Id === this.product.Id
    );

    if (existingItem) {
      // Increase quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Add quantity property
      this.product.quantity = 1;
      cartItems.push(this.product);
    }

    // Save updated cart
    setLocalStorage("so-cart", cartItems);

    // Optional confirmation
    alert("Product added to cart!");
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById(
    "productPrice"
  ).textContent = `$${product.FinalPrice}`;

  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;

  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}