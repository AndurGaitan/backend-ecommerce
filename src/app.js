import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();
const port = 8080;

// Middleware para manejar el body de las solicitudes
app.use(express.json());

// Rutas para el manejo de productos
app.use('/api/products', productsRouter);

// Rutas para el manejo de carritos
app.use('/api/carts', cartsRouter);

// Manejo de errores de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
