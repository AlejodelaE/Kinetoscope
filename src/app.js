const express = require('express');
const ProductManager = require('./product_manager');

const app = express();
const port = 3000;

const productManager = new ProductManager('./products.json');

app.get('/', (req, res) => {
    res.send('¡Bienvenidos!');
});

// Endpoint para obtener todos los productos con límite opcional
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit, 1));
            res.json({ products: limitedProducts });
        } else {
            res.json({ products });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);

        res.json({ product });
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
});