// Selección de elementos del DOM
const productos = document.querySelectorAll('.agregar-carrito');

// Event listeners
productos.forEach(producto => {
    producto.addEventListener('click', agregarProductoAlCarrito);
});

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(evento) {
    const boton = evento.target;
    const producto = {
        nombre: boton.dataset.nombre,
        precio: parseFloat(boton.dataset.precio)
    };

    // Guardar el producto en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar mensaje de agregado al carrito
    alert(`${producto.nombre} ha sido agregado al carrito.`);

    // Redirigir a "carrito de compra.html" si es necesario
    // window.location.href = 'carrito de compra.html';
}