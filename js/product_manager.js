const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.loadProducts();
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    getProducts() {
        return this.products;
    }

    addProduct(newProduct) {
        if (!this.validateProduct(newProduct)) {
            throw new Error("Todos los campos del producto son obligatorios.");
        }

        // Verificar si el código ya está en uso
        const codeExists = this.products.some(product => product.code === newProduct.code);

        if (codeExists) {
            throw new Error("El código del producto ya está en uso.");
        }

        newProduct.id = this.generateUniqueId();
        this.products.push(newProduct);
        this.saveProducts();

        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error("Producto no encontrado.");
        }

        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);

        if (index === -1) {
            throw new Error("Producto no encontrado.");
        }

        // Mantener el ID del producto
        updatedFields.id = id;

        // Actualizar el producto en la lista
        this.products[index] = updatedFields;

        this.saveProducts();

        return this.products[index];
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);

        if (index === -1) {
            throw new Error("Producto no encontrado.");
        }

        // Eliminar el producto de la lista
        const deletedProduct = this.products.splice(index, 1)[0];

        this.saveProducts();

        return deletedProduct;
    }

    validateProduct(product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        );
    }
}

// Ruta del archivo de productos
const filePath = 'products.json';

// Crear una instancia de ProductManager con la ruta especificada
const productManager = new ProductManager(filePath);

// Agregar los planes Básico, Estándar y Premium como productos
productManager.addProduct({
    title: "Plan Básico",
    description: "Acceso básico a servicios",
    price: 7.99,
    thumbnail: "thumbnail_basico.jpg",
    code: "BASIC",
    stock: 100
});
productManager.addProduct({
    title: "Plan Estándar",
    description: "Acceso estándar a servicios",
    price: 10.99,
    thumbnail: "thumbnail_estandar.jpg",
    code: "STANDARD",
    stock: 100
});
productManager.addProduct({
    title: "Plan Premium",
    description: "Acceso premium a servicios",
    price: 13.99,
    thumbnail: "thumbnail_premium.jpg",
    code: "PREMIUM",
    stock: 100
});

// Llamar a getProducts para obtener la lista de productos
console.log(productManager.getProducts());

// Obtener el ID del primer producto
const productId = productManager.getProducts()[0].id;

// Obtener y mostrar el producto por ID
try {
    const retrievedProduct = productManager.getProductById(productId);
    console.log("Producto por ID:", retrievedProduct);
} catch (error) {
    console.error(error.message);
}

// Actualizar el producto con el ID especificado
try {
    const updatedProduct = productManager.updateProduct(productId, {
        title: "Nuevo Plan Básico",
        description: "Acceso básico mejorado a servicios",
        price: 8.99,
        thumbnail: "thumbnail_nuevo_basico.jpg",
        code: "BASIC",
        stock: 90
    });
    console.log("Producto actualizado:", updatedProduct);
} catch (error) {
    console.error(error.message);
}

// Llamar a getProducts para obtener la lista actualizada de productos
console.log("Lista actualizada de productos:", productManager.getProducts());

// Eliminar el producto con el ID especificado
try {
    const deletedProduct = productManager.deleteProduct(productId);
    console.log("Producto eliminado:", deletedProduct);
} catch (error) {
    console.error(error.message);
}

// Llamar a getProducts para obtener la lista actualizada de productos después de la eliminación
console.log("Lista actualizada de productos después de la eliminación:", productManager.getProducts());