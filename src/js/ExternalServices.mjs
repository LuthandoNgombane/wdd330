const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // Constructor clean; no category needed here
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // FIX: Added 'category' parameter to prevent fetch(`${baseURL}products/search/undefined`)
  async searchProducts(searchTerm, category = "tents") {
    const products = await this.getData(category);

    const term = searchTerm.toLowerCase().trim();

    return products.filter((product) =>
      product.Name.toLowerCase().includes(term) ||
      product.NameWithoutBrand.toLowerCase().includes(term) ||
      product.Brand.Name.toLowerCase().includes(term)
    );
  }
}