import { promises as fs } from 'fs';

class ProductController {
  constructor() {
    this.filePath = './data/productos.json';
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async addProduct(newProduct) {
    try {
      const products = await this.getProducts();
      const productId = products.length + 1;
      newProduct.id = productId;
      products.push(newProduct);
      await fs.writeFile(this.filePath, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id === productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }
}

export default ProductController;
