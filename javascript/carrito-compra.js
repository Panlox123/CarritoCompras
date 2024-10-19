// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase CarritoDeCompras
class CarritoDeCompras {
    constructor() {
        this.productos = [];
        this.IGV = 0.18;
        this.descuentoPorcentaje = 0.10;
        this.limiteDescuento = 3000;
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.mostrarCarrito();
    }

    eliminarProducto(nombreProducto) {
        const index = this.productos.findIndex(prod => prod.nombre === nombreProducto);
        if (index !== -1) {
            this.productos.splice(index, 1);
            alert(`Producto "${nombreProducto}" eliminado`);
            this.mostrarCarrito();
        } else {
            alert(`Producto "${nombreProducto}" no encontrado en el carrito`);
        }
    }

    mostrarCarrito() {
        const carritoDiv = document.getElementById('carrito');
        carritoDiv.innerHTML = '';

        if (this.productos.length === 0) {
            carritoDiv.innerHTML = 'El carrito está vacío';
        } else {
            carritoDiv.innerHTML = '<strong>Productos en el carrito:</strong><br>';
            this.productos.forEach(prod => {
                carritoDiv.innerHTML += `- ${prod.nombre}: S/. ${prod.precio.toFixed(2)}<br>`;
            });
            carritoDiv.innerHTML += `<br><strong>Subtotal 1:</strong> S/. ${this.calcularSubtotal1().toFixed(2)}<br>`;
            carritoDiv.innerHTML += `<strong>Descuento:</strong> - S/. ${this.calcularDescuento().toFixed(2)}<br>`;
            carritoDiv.innerHTML += `<strong>Subtotal 2:</strong> S/. ${this.calcularSubtotal2().toFixed(2)}<br>`;
            carritoDiv.innerHTML += `<strong>IGV (18%):</strong> S/. ${this.calcularIGV().toFixed(2)}<br>`;
            carritoDiv.innerHTML += `<strong>Total a pagar:</strong> S/. ${this.calcularMontoTotal().toFixed(2)}<br>`;
        }
    }

    calcularSubtotal1() {
        return this.productos.reduce((acc, prod) => acc + prod.precio, 0);
    }

    calcularDescuento() {
        const subtotal = this.calcularSubtotal1();
        return subtotal > this.limiteDescuento ? subtotal * this.descuentoPorcentaje : 0;
    }

    calcularSubtotal2() {
        return this.calcularSubtotal1() - this.calcularDescuento();
    }

    calcularIGV() {
        return this.calcularSubtotal2() * this.IGV;
    }

    calcularMontoTotal() {
        return this.calcularSubtotal2() + this.calcularIGV();
    }
}

// Instancia del carrito de compras
const carrito = new CarritoDeCompras();

//Funciones para cada botón del formulario
function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    
    if (nombre && !isNaN(precio)) {
        const producto = new Producto(nombre, precio);
        carrito.agregarProducto(producto);
    } else {
        alert('Por favor ingrese datos válidos');
    }
}

function eliminarProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    if (nombre) {
        carrito.eliminarProducto(nombre);
    } else {
        alert('Por favor ingrese el nombre del producto a eliminar');
    }
}
