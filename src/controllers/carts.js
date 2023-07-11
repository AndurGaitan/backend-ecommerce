import { promises as fs } from 'fs';

class CartController {
  constructor() {
    this.filePath = './data/carrito.json';
  }

  async createCart(cartId) {
    try {
      const cart = {
        id: cartId,
        products: [],
      };
      await fs.writeFile(this.filePath, JSON.stringify(cart));
      return cart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  async getCart(cartId) {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const cart = JSON.parse(data);
      if (cart.id !== cartId) {
        throw new Error('Carrito no encontrado');
      }
      return cart.products;
    } catch (error) {
      throw new Error('Error al obtener los productos del carrito');
    }
  }

  async addProduct(cartId, productId, quantity) {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const cart = JSON.parse(data);
      if (cart.id !== cartId) {
        throw new Error('Carrito no encontrado');
      }
      const newProduct = { product: productId, quantity };
      cart.products.push(newProduct);
      await fs.writeFile(this.filePath, JSON.stringify(cart));
      return cart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }
}

export default CartController;
