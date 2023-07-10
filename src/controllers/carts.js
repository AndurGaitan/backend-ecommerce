import express from 'express';
import Cart from '../models/cart.js';

const router = express.Router();
const cart = new Cart();

// Crear un nuevo carrito
router.post('/', (req, res) => {
  try {
    const cartId = req.body.id;
    const newCart = cart.createCart(cartId);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos de un carrito por su ID
router.get('/:cid', (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = cart.getProducts(cartId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    const updatedCart = cart.addProduct(cartId, productId, quantity);
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

export default router;