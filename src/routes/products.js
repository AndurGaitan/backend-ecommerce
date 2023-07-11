import express from 'express';
import ProductController from '../controllers/products.js';

const router = express.Router();
const productController = new ProductController();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productController.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productController.addProduct(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por su ID
router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productController.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
