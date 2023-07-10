import { promises as fs } from 'fs';

class Cart {
  constructor() {
    this.filePath = 'data/carrito.json';
  }

  async createCart(cartId) {
    const cart = {
      id: cartId,
      products: []
    };
    await this.saveCart(cart);
    return cart;
  }

  async getCart() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async saveCart(cart) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cart, null, 2));
    } catch (error) {
      throw new Error('Error al guardar el carrito');
    }
  }

  async getProducts(cartId) {
    try {
      const cart = await this.getCart();
      const foundCart = cart.find(c => c.id === cartId);
      if (!foundCart) {
        throw new Error('Carrito no encontrado');
      }
      return foundCart.products;
    } catch (error) {
      throw new Error('Error al obtener los productos del carrito');
    }
  }

  async addProduct(cartId, productId, quantity) {
    try {
      const cart = await this.getCart();
      const foundCart = cart.find(c => c.id === cartId);
      if (!foundCart) {
        throw new Error('Carrito no encontrado');
      }
      const newProduct = { product: productId, quantity };
      foundCart.products.push(newProduct);
      await this.saveCart(cart);
      return foundCart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }
}

export default Cart;
