import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const imagePath = product.Image;

  // Check if the product is discounted
  const isDiscounted =
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

  // Calculate discount percentage
  const discountPercentage = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  return `
    <li class="product-card">
      ${
        isDiscounted
          ? `<span class="discount-badge">${discountPercentage}% OFF</span>`
          : ""
      }

      <a href="product_pages/?product=${product.Id}">
        <img src="${imagePath}" alt="${product.Name}">

        <h2 class="card__brand">${product.Brand.Name}</h2>

        <h3 class="card__name">${product.NameWithoutBrand}</h3>

        ${
          isDiscounted
            ? `
              <p class="product-card__retail-price">
                $${Number(product.SuggestedRetailPrice).toFixed(2)}
              </p>
            `
            : ""
        }

        <p class="product-card__price">
          $${Number(product.FinalPrice).toFixed(2)}
        </p>

      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData();

    // Exclude products that don't have images
    this.products = this.products.filter(
      (product) => product.Id !== "989CG" && product.Id !== "880RT"
    );

    this.renderList(this.products);
  }

  renderList(list) {
    this.listElement.innerHTML = "";

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "beforeend"
    );
  }

  search(query) {
    const filtered = this.products.filter((product) => {
      const text =
        `${product.Brand.Name} ${product.NameWithoutBrand}`.toLowerCase();

      return text.includes(query.toLowerCase());
    });

    this.renderList(filtered);
  }
}