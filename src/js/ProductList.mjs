import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Fix image path for API data
  const imagePath = product.Images?.PrimaryMedium || product.Image;

  const isDiscounted =
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

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
      <a href="/product_pages/?product=${product.Id}">
        <img src="${imagePath}" alt="${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        ${
          isDiscounted
            ? `<p class="product-card__retail-price">$${Number(product.SuggestedRetailPrice).toFixed(2)}</p>`
            : ""
        }
        <p class="product-card__price">$${Number(product.FinalPrice).toFixed(2)}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

 async init() {
  const list = await this.dataSource.getData(this.category);
  this.renderList(list);

  // Format category string (e.g. "sleeping-bags" -> "Sleeping Bags")
  const formattedCategory = this.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const titleElement = document.querySelector(".title");
  if (titleElement) {
    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }
}

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

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