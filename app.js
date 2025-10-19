// Datos de productos de la ferretería
const productos = [
    {
        id: 1,
        nombre: "Martillo de Carpintero",
        categoria: "herramientas",
        descripcion: "Martillo profesional con mango de madera y cabeza de acero",
        precio: 450,
        stock: 25
    },
    {
        id: 2,
        nombre: "Destornillador Phillips",
        categoria: "herramientas",
        descripcion: "Juego de destornilladores Phillips de diferentes tamaños",
        precio: 280,
        stock: 40
    },
    {
        id: 3,
        nombre: "Taladro Eléctrico",
        categoria: "herramientas",
        descripcion: "Taladro percutor de 500W con velocidad variable",
        precio: 3500,
        stock: 8
    },
    {
        id: 4,
        nombre: "Cable Eléctrico 2x2.5mm",
        categoria: "electricidad",
        descripcion: "Rollo de cable eléctrico de 100 metros",
        precio: 1200,
        stock: 15
    },
    {
        id: 5,
        nombre: "Interruptor Simple",
        categoria: "electricidad",
        descripcion: "Interruptor de luz simple con placa incluida",
        precio: 85,
        stock: 60
    },
    {
        id: 6,
        nombre: "Bombilla LED 9W",
        categoria: "electricidad",
        descripcion: "Bombilla LED de bajo consumo, luz cálida",
        precio: 120,
        stock: 50
    },
    {
        id: 7,
        nombre: "Llave Inglesa",
        categoria: "plomeria",
        descripcion: "Llave ajustable de 12 pulgadas",
        precio: 380,
        stock: 20
    },
    {
        id: 8,
        nombre: "Cinta Teflón",
        categoria: "plomeria",
        descripcion: "Cinta de teflón para sellado de roscas",
        precio: 45,
        stock: 100
    },
    {
        id: 9,
        nombre: "Caño PVC 1/2 pulgada",
        categoria: "plomeria",
        descripcion: "Tubo PVC de 3 metros para instalaciones sanitarias",
        precio: 220,
        stock: 35
    },
    {
        id: 10,
        nombre: "Pintura Látex Blanco",
        categoria: "pintura",
        descripcion: "Pintura látex interior/exterior, 4 litros",
        precio: 890,
        stock: 18
    },
    {
        id: 11,
        nombre: "Rodillo para Pintar",
        categoria: "pintura",
        descripcion: "Rodillo con mango extensible y bandeja",
        precio: 320,
        stock: 30
    },
    {
        id: 12,
        nombre: "Brocha 3 pulgadas",
        categoria: "pintura",
        descripcion: "Brocha profesional de cerdas sintéticas",
        precio: 180,
        stock: 45
    },
    {
        id: 13,
        nombre: "Cemento Portland",
        categoria: "construccion",
        descripcion: "Bolsa de cemento de 50kg",
        precio: 650,
        stock: 50
    },
    {
        id: 14,
        nombre: "Arena Fina",
        categoria: "construccion",
        descripcion: "Bolsa de arena fina de 25kg",
        precio: 180,
        stock: 80
    },
    {
        id: 15,
        nombre: "Ladrillo Hueco",
        categoria: "construccion",
        descripcion: "Ladrillo hueco de 12x18x33cm (precio por unidad)",
        precio: 35,
        stock: 500
    }
];

// Estado de la aplicación
let carrito = [];
let productosFiltrados = [...productos];

// Elementos del DOM
const productList = document.getElementById('productList');
const cartSection = document.getElementById('cartSection');
const productSection = document.getElementById('productSection');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Inicializar la aplicación
function init() {
    renderProductos();
    actualizarCarrito();
    
    // Event listeners
    searchInput.addEventListener('input', filtrarProductos);
    categoryFilter.addEventListener('change', filtrarProductos);
    cartBtn.addEventListener('click', mostrarCarrito);
    closeCartBtn.addEventListener('click', ocultarCarrito);
    checkoutBtn.addEventListener('click', finalizarCompra);
}

// Renderizar productos
function renderProductos() {
    productList.innerHTML = '';
    
    if (productosFiltrados.length === 0) {
        productList.innerHTML = '<p class="empty-cart">No se encontraron productos</p>';
        return;
    }
    
    productosFiltrados.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'product-card';
        
        const stockClass = producto.stock < 10 ? 'low-stock' : '';
        const stockText = producto.stock < 10 ? '¡Últimas unidades!' : `Stock: ${producto.stock} unidades`;
        
        productoCard.innerHTML = `
            <h3>${producto.nombre}</h3>
            <span class="product-category">${producto.categoria}</span>
            <p class="product-description">${producto.descripcion}</p>
            <div class="product-price">$${producto.precio}</div>
            <p class="product-stock ${stockClass}">${stockText}</p>
            <div class="product-actions">
                <input type="number" id="qty-${producto.id}" value="1" min="1" max="${producto.stock}">
                <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        
        productList.appendChild(productoCard);
    });
}

// Filtrar productos
function filtrarProductos() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoria = categoryFilter.value;
    
    productosFiltrados = productos.filter(producto => {
        const matchSearch = producto.nombre.toLowerCase().includes(searchTerm) ||
                          producto.descripcion.toLowerCase().includes(searchTerm);
        const matchCategory = categoria === '' || producto.categoria === categoria;
        
        return matchSearch && matchCategory;
    });
    
    renderProductos();
}

// Agregar producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const qtyInput = document.getElementById(`qty-${productoId}`);
    const cantidad = parseInt(qtyInput.value);
    
    if (!producto || cantidad <= 0) return;
    
    if (cantidad > producto.stock) {
        alert(`Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}`);
        return;
    }
    
    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        const nuevaCantidad = itemExistente.cantidad + cantidad;
        if (nuevaCantidad > producto.stock) {
            alert(`Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}`);
            return;
        }
        itemExistente.cantidad = nuevaCantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }
    
    actualizarCarrito();
    qtyInput.value = 1;
    
    // Feedback visual
    alert(`${cantidad} x ${producto.nombre} agregado al carrito`);
}

// Actualizar carrito
function actualizarCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrecio.toFixed(2);
    
    renderCarrito();
}

// Renderizar carrito
function renderCarrito() {
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        checkoutBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    cartItems.innerHTML = '';
    
    carrito.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <p>${item.descripcion}</p>
                <p>Precio unitario: $${item.precio}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-price">
                $${(item.precio * item.cantidad).toFixed(2)}
            </div>
            <button class="btn btn-danger" onclick="eliminarDelCarrito(${item.id})">
                Eliminar
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
}

// Cambiar cantidad en el carrito
function cambiarCantidad(productoId, cambio) {
    const item = carrito.find(i => i.id === productoId);
    const producto = productos.find(p => p.id === productoId);
    
    if (!item || !producto) return;
    
    const nuevaCantidad = item.cantidad + cambio;
    
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }
    
    if (nuevaCantidad > producto.stock) {
        alert(`Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}`);
        return;
    }
    
    item.cantidad = nuevaCantidad;
    actualizarCarrito();
}

// Eliminar del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
    productSection.style.display = 'none';
    cartSection.style.display = 'block';
}

// Ocultar carrito
function ocultarCarrito() {
    productSection.style.display = 'block';
    cartSection.style.display = 'none';
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const resumen = carrito.map(item => 
        `${item.cantidad} x ${item.nombre} - $${(item.precio * item.cantidad).toFixed(2)}`
    ).join('\n');
    
    const confirmacion = confirm(
        `Resumen de compra:\n\n${resumen}\n\nTotal: $${total.toFixed(2)}\n\n¿Confirmar compra?`
    );
    
    if (confirmacion) {
        // Actualizar stock
        carrito.forEach(item => {
            const producto = productos.find(p => p.id === item.id);
            if (producto) {
                producto.stock -= item.cantidad;
            }
        });
        
        alert('¡Compra realizada con éxito! Gracias por su compra.');
        carrito = [];
        actualizarCarrito();
        ocultarCarrito();
        renderProductos();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
