class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
    addToPorfolio() {
        this.cantidad++;
    }
    actualizarPrecioTotal() {
        this.totalPrecio = this.precio * this.cantidad;
    }
}

const contadorCarrito = document.getElementById("contadorCarrito")
const contenedorCarrito = document.getElementById("carrito-contenedor")
const vaciarCarrito = document.getElementById('vaciarCarrito')
const pagarCarrito = document.getElementById('pagarCarrito')
const totalPrecioCarrito = document.getElementById('totalPrecioCarrito')
const cantidadTotal = document.getElementById('cantidadTotal')
const btnCarrito = document.getElementById("btnCarrito")
const carritoLocal = localStorage.getItem("carrito")

// Carrito de compras
let carrito = [];
carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Funcion eliminar item carrito
const deleteCart = (productoId) => {
    const item = carrito.find((producto) => producto.id === productoId);
    const index = carrito.indexOf(item);
    carrito.splice(index, 1);
    actualizarCarrito()
    if (carrito.length === 0) {
        btnCarrito.classList.remove("apareceBtn")
    }
}
// Funcion eliminar todos los item del carrito
vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    btnCarrito.classList.remove("apareceBtn")
})

// Funcion pagar carrito
pagarCarrito.addEventListener('click', () => {
    Swal.fire(`Tu compra total es de $${totalCarrito}, dejanos tus datos y te contactaremos en la brevedad. Gracias! 🎉`)
    carrito.length = 0;
    btnCarrito.classList.remove("apareceBtn")
    actualizarCarrito()
    setTimeout(function () {
        window.location.href = "../contacto.html"
    }, 5000);
})

// Funcion crear producto al carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    if (carrito.length === 0) {
        let aviso = document.createElement("div");
        aviso.innerHTML =
            `<p class="carritoVacio"> El carrito de compras está vacío </p>`
        contenedorCarrito.appendChild(aviso);
    } else {
        carrito.forEach((producto) => {
          let card = document.createElement("div")
          card.classList.add("card");
          card.classList.add("my-4");
          card.innerHTML = `
          <div class="row g-0">
              <div class="col-md-3 col-sm-3 col-3 img-carrito">
                  <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.nombre}">
              </div>
              <div class="col-md-6 col-sm-6 col-6">
                 <div class="card-detalle">
                    <p class="card-title">${producto.nombre} </p>
                    <p class="card-text">Cant: ${producto.cantidad}</p>
                    <p class="card-text">Total: $ ${producto.totalPrecio}</p>
                 </div>
              </div>
              <div class="col-md-3 col-sm-3 col-3 d-flex">
                    <button class="btn btn-primary eliminar" id="eliminar${producto.id}">Eliminar</button>
              </div>
          </div>
        `
            contenedorCarrito.appendChild(card);

            const botonDelete = document.getElementById(`eliminar${producto.id}`)
            botonDelete.addEventListener('click', () => {
                deleteCart(producto.id)
            })
        })
        btnCarrito.classList.add("apareceBtn");
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length;
    totalPrecioCarrito.innerText = carrito.reduce((total, elemento) => total + elemento.totalPrecio, 0);
    totalCarrito = carrito.reduce((total, elemento) => total + elemento.totalPrecio, 0);
}
actualizarCarrito()