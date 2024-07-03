// Selección de elementos del DOM
const listaCarrito = document.querySelector('.lista-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalCarrito = document.getElementById('total-carrito');

// Cargar productos desde localStorage
document.addEventListener('DOMContentLoaded', cargarCarrito);

// Event listeners
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(producto => {
        agregarProductoHTML(producto);
    });
    actualizarTotal();
}

// Función para mostrar el producto en el carrito
function agregarProductoHTML(producto) {
    const elemento = document.createElement('li');
    elemento.innerHTML = `
        <span>${producto.nombre} - $${producto.precio}</span>
        <button class="borrar-producto" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Eliminar</button>
        <button class="sumar-cantidad" data-nombre="${producto.nombre}" data-precio="${producto.precio}">+</button>
        <button class="restar-cantidad" data-nombre="${producto.nombre}" data-precio="${producto.precio}">-</button>
    `;
    listaCarrito.appendChild(elemento);

    // Event listeners para los botones de eliminar, sumar y restar
    elemento.querySelector('.borrar-producto').addEventListener('click', borrarProducto);
    elemento.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);
    elemento.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);
}

// Función para eliminar un producto del carrito
function borrarProducto(evento) {
    const boton = evento.target;
    const nombreProducto = boton.dataset.nombre;

    const itemEliminar = boton.parentElement;
    itemEliminar.remove();

    // Actualizar localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarTotal();
}

// Función para sumar la cantidad de un producto en el carrito
function sumarCantidad(evento) {
    const boton = evento.target;
    const nombreProducto = boton.dataset.nombre;

    const precioProducto = parseFloat(boton.dataset.precio);
    const item = boton.parentElement.querySelector('span');
    const precioActual = parseFloat(item.textContent.split('-')[1].trim().replace('$', ''));

    item.textContent = `${nombreProducto} - $${(precioActual + precioProducto).toFixed(2)}`;

    actualizarTotal();
}

// Función para restar la cantidad de un producto en el carrito
function restarCantidad(evento) {
    const boton = evento.target;
    const nombreProducto = boton.dataset.nombre;

    const precioProducto = parseFloat(boton.dataset.precio);
    const item = boton.parentElement.querySelector('span');
    const precioActual = parseFloat(item.textContent.split('-')[1].trim().replace('$', ''));

    if (precioActual - precioProducto > 0) {
        item.textContent = `${nombreProducto} - $${(precioActual - precioProducto).toFixed(2)}`;
    } else {
        item.parentElement.remove();
    }

    actualizarTotal();
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    let total = 0;
    const itemsCarrito = document.querySelectorAll('.lista-carrito li span');

    itemsCarrito.forEach(item => {
        const precio = parseFloat(item.textContent.split('-')[1].trim().replace('$', ''));
        total += precio;
    });

    totalCarrito.textContent = total.toFixed(2);
}

// Función para vaciar el carrito
function vaciarCarrito() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
    localStorage.removeItem('carrito');
    actualizarTotal();
}