import express from 'express';
import ProductController from '../controllers/products.js';

const router = express.Router();
const productController = new ProductController();

// Obtener todos los productos
router.get('/', productController.getProducts);

// Agregar un nuevo producto
router.post('/', productController.createProduct);

// Obtener un producto por su ID
router.get('/:pid', productController.getProductById);

// Actualizar un producto por su ID
router.put('/:pid', productController.updateProduct);

// Eliminar un producto por su ID
router.delete('/:pid', productController.deleteProduct);

export default router;
