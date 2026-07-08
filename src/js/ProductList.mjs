import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let imagePath = product.Image;

    if (product.NameWithoutBrand === "Ajax Tent - 2-Person, 3-Season" || product.Id === "880RR-2") {
        imagePath = "images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg";
    } else if (product.NameWithoutBrand === "Talus Tent - 3-Person, 3-Season" || product.Id === "985RF") {
        imagePath = "images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg";
    }

    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="/${imagePath}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}