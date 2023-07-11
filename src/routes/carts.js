import express from 'express';
import CartController from '../controllers/carts.js';

const router = express.Router();
const cartController = new CartController();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const cartId = req.body.id;
    const cart = await cartController.createCart(cartId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = await cartController.getCart(cartId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    const cart = await cartController.addProduct(cartId, productId, quantity);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
