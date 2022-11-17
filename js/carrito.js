class Productos {
  constructor(id, cat, nombre, precio, img) {
    this.id = id;
    this.cat = cat
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

const contenedorProductos = document.getElementById("contenedor-productos")


const contenedorCarrito = document.getElementById("carrito-contenedor")
const contadorCarrito = document.getElementById('contadorCarrito')
const vaciarCarrito = document.getElementById('vaciarCarrito')
const pagarCarrito = document.getElementById('pagarCarrito')
const totalPrecioCarrito = document.getElementById('totalPrecioCarrito')
const cantidadTotal = document.getElementById('cantidadTotal')
const btnCarrito = document.getElementById("btnCarrito")
const samsung = document.getElementById("samsung")
const motorola = document.getElementById("motorola")
const otros = document.getElementById("otros")



// Productos disponibles en la pagina

stockProductos = [];
const buscarProductos = async () => {
  const respuesta = await fetch("../api/productos.json");
  const data = await respuesta.json();
  data.forEach((producto) => {
    stockProductos.push(new Productos(producto.id, producto.cat, producto.nombre, producto.precio, producto.img))
  });
  renderizacionProductos()
}



buscarProductos()




// renderizacdo de todos los productos 

function renderizacionProductos() {
  for (const producto of stockProductos) {

    let card = document.createElement('div');


    card.classList.add("cont-card");
    card.classList.add("p-4");
    card.classList.add("col-lg-3");
    card.classList.add("col-md-4");
    card.classList.add("col-sm-5");


    card.innerHTML = `
             <figure class="card card-home">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <p class="card-title">${producto.nombre} </p>
                <p class="card-text">$ ${producto.precio}</p>
                <button class="btn btn-primary" id="p${producto.id}">Agregar al Carrito</button>
             </figure>
           `;
    contenedorProductos.appendChild(card);


    const boton = document.getElementById(`p${producto.id}`);
   
   
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });


  }
}



renderizacionProductos()

// filtros por categoria de productos y actualizacion de renderizado

function filtrado(parametro) {


  parametro.forEach(producto => {


    let card = document.createElement('div');


    card.classList.add("cont-card");
    card.classList.add("p-4");
    card.classList.add("col-lg-3");
    card.classList.add("col-md-4");
    card.classList.add("col-sm-5");


    card.innerHTML = `
             <figure class="card card-home">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <p class="card-title">${producto.nombre} </p>
                <p class="card-text">$ ${producto.precio}</p>
                <button class="btn btn-primary" id="p${producto.id}">Agregar al Carrito</button>
             </figure>
           `;

    contenedorProductos.appendChild(card);


    const boton = document.getElementById(`p${producto.id}`);

    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  })
}



let filtro = [];

samsung.addEventListener("click", () => {
  contenedorProductos.innerHTML = "";
  filtro = stockProductos.filter(producto => producto.cat === "Samsung");
  filtrado(filtro)
});


motorola.addEventListener("click", () => {
  contenedorProductos.innerHTML = "";
  filtro = stockProductos.filter(producto => producto.cat === "Motorola");
  filtrado(filtro)
});
otros.addEventListener("click", () => {
  contenedorProductos.innerHTML = "";
  filtro = stockProductos.filter(producto => producto.cat === "otros");
  filtrado(filtro)
});

// Carrito de compras
let carrito = [];
carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Funcion argegar al carrito

const agregarAlCarrito = (productoId) => {
  const item = carrito.find((producto) => producto.id === productoId);
 
 
 
  if (item) {
    function addToPorfolio() {
      item.cantidad++;
    }


    addToPorfolio();


    function actualizarPrecioTotal() {
      item.totalPrecio = item.precio * item.cantidad;
    }


    actualizarPrecioTotal()



    Toastify({
      text: `${item.nombre} se agrego al carrito 🎉`,
      duration: 3000,
      gravity: 'top',
      className: "notiCarrito",
      position: 'center',
      backgroundColor: "gray",
    }).showToast();



  } else {
    let newProducto = stockProductos.find((producto) => producto.id === productoId);
    carrito.push(new Productos(newProducto.id, newProducto.cat, newProducto.nombre, newProducto.precio, newProducto.img));
    carrito[carrito.length - 1].actualizarPrecioTotal()

    Toastify({
      text: `${newProducto.nombre} se agrego al carrito 🎉`,
      duration: 3000,
      gravity: 'top',
      className: "notiCarrito",
      position: 'center',
      backgroundColor: "gray",
    }).showToast();
  }
  actualizarCarrito()
}




// Funcion eliminar item carrito
const deleteCart = (productoId) => {
  const item = carrito.find((producto) => producto.id === productoId);
  const index = carrito.indexOf(item);
  carrito.splice(index, 1);

  actualizarCarrito()


  if (carrito.length === 0) {
    btnCarrito.classList.remove("apareceBtn")}
}




// Funcion eliminar todos los item del carrito
vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0
  btnCarrito.classList.remove("apareceBtn");
  actualizarCarrito()
})





// Funcion pagar carrito
pagarCarrito.addEventListener('click', () => {
  Swal.fire(`Tu compra total es de $${totalCarrito}, dejanos tus datos y te contactaremos en la brevedad. Gracias! 🎉`)
  carrito.length = 0;
  btnCarrito.classList.remove("apareceBtn");
  actualizarCarrito()
  setTimeout( function() {window.location.href = "../contacto.html"}, 5000 );
})




// Funcion crear producto al carrito
const actualizarCarrito = () => {


  contenedorCarrito.innerHTML = "";


  if (carrito.length === 0) {


    let aviso = document.createElement("div");


    aviso.innerHTML =`<p class="carritoVacio"> El carrito de compras está vacío </p>`

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

  contadorCarrito.innerText = carrito.length

  totalPrecioCarrito.innerText = carrito.reduce((total, elemento) => total + elemento.totalPrecio, 0);

  totalCarrito = carrito.reduce((total, elemento) => total + elemento.totalPrecio, 0);
  
}


actualizarCarrito()