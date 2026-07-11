function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    //LN - moved js
    this.path = `/json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async searchProducts(searchTerm) {
    const products = await this.getData();

    const term = searchTerm.toLowerCase().trim();

    return products.filter((product) =>
      product.Name.toLowerCase().includes(term) ||
      product.NameWithoutBrand.toLowerCase().includes(term) ||
      product.Brand.Name.toLowerCase().includes(term)
    );
  }
}