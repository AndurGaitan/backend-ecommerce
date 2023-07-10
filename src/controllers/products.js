import express from 'express';
import Product from '../models/products.js';

const router = express.Router();
const product = new Product();

// Obtener todos los productos
router.get('/', (req, res) => {
  try {
    const products = product.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  try {
    const newProduct = req.body;
    const createdProduct = product.createProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por su ID
router.get('/:pid', (req, res) => {
  try {
    const productId = req.params.pid;
    const foundProduct = product.getProductById(productId);
    if (!foundProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(foundProduct);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto por su ID
router.put('/:pid', (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedFields = req.body;
    const updatedProduct = product.updateProduct(productId, updatedFields);
    if (!updatedProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = product.deleteProduct(productId);
    if (!deletedProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json({ message: 'Producto eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
