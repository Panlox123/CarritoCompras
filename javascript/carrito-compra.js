// //Clase Producto
// class Producto {
//     constructor(nombre, precio) {
//         this.nombre = nombre;
//         this.precio = precio;
//     }
// }

// //Clase CarritoDeCompras
// class CarritoDeCompras {
//     constructor() {
//         this.productos = [];
//         this.IGV = 0.18; // El IGV
//         this.descuentoPorcentaje = 0.10; // El descuento
//         this.limiteDescuento = 3000; // El valor "top" o límite para el descuento
//     }

//     agregarProducto(producto) {
//         this.productos.push(producto);
//         document.write(`"${producto.nombre}" ha sido agregado al carrito<br>`);
//     }

//     eliminarProducto(nombreProducto) {
//         const index = this.productos.findIndex(prod => prod.nombre === nombreProducto);
//         if (index !== -1) {
//             this.productos.splice(index, 1);
//             document.write(`"${nombreProducto}" ha sido eliminado del carrito<br>`);
//         } else {
//             document.write(`${nombreProducto} no se encontró en el carrito`);
//         }
//     }

//     calcularSubtotal1() {
//         const subtotal1 = this.productos.reduce((acc, prod) => acc + prod.precio, 0);
//         return subtotal1;
//     }

//     calcularDescuento() {
//         let descuento = 0;
//         const subtotal = this.calcularSubtotal1();
//         if (subtotal > this.limiteDescuento) {
//             descuento = subtotal * this.descuentoPorcentaje;
//         }
//         return descuento;
//     }

//     calcularSubtotal2() {
//         const subtotal2 = this.calcularSubtotal1() - this.calcularDescuento();
//         return subtotal2;
//     }

//     calcularIGV() {
//         const monto = this.calcularSubtotal2();
//         const igv = monto * this.IGV;
//         return igv;
//     }

//     calcularMontoTotal() {
//         const total = this.calcularSubtotal2() + this.calcularIGV();
//         return total;
//     }

//     mostrarCarrito() {
//         if (this.productos.length === 0) {
//             document.write('El carrito está vacío');
//         } else {
//             /*document.write('<br>Resumen de la compra:<br><br>');*/
//             document.write('<br><strong>Productos en el carrito:</strong><br><br>');
//             this.productos.forEach(prod => document.write(`- ${prod.nombre}: $${prod.precio}<br>`));
//         }
//     }
// }

// //Ejemplo de uso
// const carrito = new CarritoDeCompras();

// const producto1 = new Producto('Laptop', 5000);
// const producto2 = new Producto('Mouse', 200);
// const producto3 = new Producto('Teclado', 500);

// document.write("<strong>Productos a agregar:</strong> <br><br>");
// carrito.agregarProducto(producto1);
// carrito.agregarProducto(producto2);
// carrito.agregarProducto(producto3);
// carrito.mostrarCarrito();

// document.write("<br><strong>Detalle de facturación:</strong> <br><br>");
// document.write(`<br><strong>Subtotal 1:</strong> S/. ${carrito.calcularSubtotal1().toFixed(2)}<br>`);
// document.write(`<strong>Descuento aplicado:</strong> - S/. ${carrito.calcularDescuento().toFixed(2)}<br>`);
// document.write(`<strong>Subtotal 2 (Subtotal 1 - Descuento):</strong> S/. ${carrito.calcularSubtotal2().toFixed(2)}<br>`);
// document.write(`<strong>IGV aplicado (18% del Subtotal 2):</strong> S/. ${carrito.calcularIGV().toFixed(2)}<br>`);
// document.write(`<br><strong>Total a pagar:</strong> S/. ${carrito.calcularMontoTotal().toFixed(2)}</strong><br>`);

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

// Manejo del carrito de compras
const carrito = new CarritoDeCompras();

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
