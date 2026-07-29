import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.Quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    const container = document.querySelector(this.outputSelector);
    if (!container) return;

    let itemCount = 0;
    this.itemTotal = this.list.reduce((sum, item) => {
      const qty = item.Quantity || 1;
      itemCount += qty;
      return sum + Number(item.FinalPrice) * qty;
    }, 0);

    const subtotalEl = container.querySelector("#subtotal");
    const numItemsEl = container.querySelector("#num-items");

    if (subtotalEl) subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (numItemsEl) numItemsEl.innerText = itemCount;
  }

  calculateOrderTotal() {
    let itemCount = 0;
    this.list.forEach((item) => {
      itemCount += item.Quantity || 1;
    });

    if (itemCount > 0) {
      // $10 for first item + $2 for each extra item
      this.shipping = 10 + (itemCount - 1) * 2;
      // 6% sales tax
      this.tax = this.itemTotal * 0.06;
      this.orderTotal = this.itemTotal + this.shipping + this.tax;
    } else {
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const container = document.querySelector(this.outputSelector);
    if (!container) return;

    const shippingEl = container.querySelector("#shipping");
    const taxEl = container.querySelector("#tax");
    const orderTotalEl = container.querySelector("#orderTotal");

    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (orderTotalEl) orderTotalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const json = formDataToJSON(form);

    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal.toFixed(2);
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    try {
      const services = new ExternalServices();
      const res = await services.checkout(json);
      console.log("Order submitted successfully:", res);
      return res;
    } catch (err) {
      console.error("Order submission failed:", err);
      throw err;
    }
  }
}