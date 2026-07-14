import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

//LN - Week 2 - Individual Assignment - Changes
//LN : Imported updateCartBadge function to dynamically calculate total quantities and update the header badge.

//LN - : Week 3 - Team Activity Changes
//LN : Imported loader function to load header and footer templates and render them.
import { updateCartBadge, loadHeaderFooter } from "./utils.mjs";

//LN : Week 3 - Team Activity Changes
//LN : Load header and footer templates and render them.
loadHeaderFooter();

//LN - Week 2 - Individual Assignment - Changes
//LN : Dynamically calculates total quantities and updates the header badge.
updateCartBadge();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();