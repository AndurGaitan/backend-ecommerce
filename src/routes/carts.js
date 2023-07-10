import express from 'express';
import CartController from '../controllers/carts.js';

const router = express.Router();
const cartController = new CartController();

// Crear un nuevo carrito
router.post('/', cartController.createCart);

// Obtener productos de un carrito por su ID
router.get('/:cid', cartController.getProducts);

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', cartController.addProduct);

export default router;
