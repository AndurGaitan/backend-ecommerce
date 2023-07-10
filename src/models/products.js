import { promises as fs } from 'fs';

class Product {
  constructor() {
    this.filePath = 'data/productos.json';
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async createProduct(newProduct) {
    try {
      const products = await this.getProducts();
      const productId = Math.max(...products.map(p => p.id)) + 1;
      const product = { id: productId, ...newProduct };
      products.push(product);
      await this.saveProducts(products);
      return product;
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      return products.find(p => p.id === productId);
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  async updateProduct(productId, updatedFields) {
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id === productId);
      if (!product) {
        return null;
      }
      Object.assign(product, updatedFields);
      await this.saveProducts(products);
      return product;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(p => p.id === productId);
      if (index === -1) {
        return null;
      }
      const deletedProduct = products.splice(index, 1)[0];
      await this.saveProducts(products);
      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }

  async saveProducts(products) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    } catch (error) {
      throw new Error('Error al guardar los productos');
    }
  }
}

export default Product;
