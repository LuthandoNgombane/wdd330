import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Safe navigation for API image structures
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
    this.products = []; // Store fetched list locally for client-side search filtering
  }

  async init() {
    // Default to 'tents' if no category passed in URL
    const currentCategory = this.category || "tents";
    
    const list = await this.dataSource.getData(currentCategory);
    this.products = list; // Save for client-side search
    this.renderList(list);

    // Format category string safely (e.g. "sleeping-bags" -> "Sleeping Bags")
    const formattedCategory = currentCategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const titleElement = document.querySelector(".title") || document.querySelector(".products h2");
    if (titleElement) {
      titleElement.textContent = `Top Products: ${formattedCategory}`;
    }
  }

  renderList(list) {
    // Clear list before rendering (helps when filtering)
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  search(query) {
    if (!query) {
      this.renderList(this.products);
      return;
    }

    const filtered = this.products.filter((product) => {
      const text = `${product.Brand?.Name || ""} ${product.NameWithoutBrand || ""}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });

    this.renderList(filtered);
  }
}