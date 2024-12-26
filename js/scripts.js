/* CODIGO NAVBAR */
const navbarToggler = document.getElementById("navbar-toggler");
const navbarMenu = document.getElementById("navbar-menu");

navbarToggler.addEventListener("click", () => {
  if (navbarMenu.style.display === "flex") {
    navbarMenu.style.display = "none";
  } else {
    navbarMenu.style.display = "flex";
  }
});

/* FUNCION CARGA PRODUCTOS */
async function cargarProductos() {
  try {
    const response = await fetch("../json/productos.json");
    if (!response.ok) {
      throw new Error("Error al cargar los productos");
    }
    const data = await response.text();
    productos = JSON.parse(data);

    console.log("Productos cargados y transformados:", productos);

    const container = document.getElementById("products-container");

    productos.forEach((producto) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <h2>${producto.nombre}</h2>
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <p class="product-price">Precio: $${producto.precio.toFixed(2)}</p>
        <button class="btn-ver-mas" data-product="${producto.id}">Ver más</button>
        <button class="btn-comprar" data-product="${producto.id}">Comprar</button>
      `;
      container.appendChild(productCard);
    });

    agregarEventosModal();
    agregarEventosComprar();
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

/* FUNCION PARA AGREGAR AL CARRITO */
function agregarAlCarrito(productId) {
  const producto = productos.find((p) => p.id === productId);

  if (producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find((p) => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      producto.cantidad = 1;
      carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito!");
  }
}

/* FUNCION PARA AGREGAR EVENTOS AL MODAL */
function agregarEventosModal() {
  const modal = document.getElementById("product-modal");
  const buttons = document.querySelectorAll(".product-card .btn-ver-mas");
  const closeBtn = document.querySelector(".modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalPrice = document.getElementById("modal-price");
  const comprarBtn = document.getElementById("btn-comprar-modal");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-product");
      const producto = productos.find((p) => p.id === productId);

      if (producto) {
        modalTitle.textContent = producto.nombre;
        modalImage.src = producto.imagen;
        modalDescription.textContent = producto.descripcion;
        modalPrice.textContent = `Precio: $${producto.precio.toFixed(2)}`;
        comprarBtn.setAttribute("data-product", productId);
        modal.style.display = "block";
      } else {
        console.error("Producto no encontrado:", productId);
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  comprarBtn.addEventListener("click", () => {
    const productId = comprarBtn.getAttribute("data-product");
    agregarAlCarrito(productId);
    modal.style.display = "none";
  });
}

/* FUNCION PARA AGREGAR EVENTOS AL BOTON DE COMPRAR */
function agregarEventosComprar() {
  const buttons = document.querySelectorAll(".product-card .btn-comprar");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-product");
      agregarAlCarrito(productId);
    });
  });
}

/* CARRITO */

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productosCarrito = document.getElementById("productos-carrito");
  const totalElement = document.getElementById("total");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

  productosCarrito.innerHTML = "";

  if (carrito.length === 0) {
    productosCarrito.innerHTML = "<p>No tenés productos en tu carrito.</p>";
    totalElement.textContent = "Total: $0.00";
    return;
  }

  let total = 0;
  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("producto-carrito");
    totalPorProducto = producto.precio * producto.cantidad;
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="info-producto">
        <h3>${producto.nombre}</h3>
        <p>Precio por unidad: $${producto.precio}</p>
        <p>Total por producto: $${totalPorProducto}</p>
      </div>
      <div class="cantidad-container">
      <span>Cantidad:</span>
        <button class="btn-restar" data-index="${index}">-</button>
        <span>${producto.cantidad}</span>
        <button class="btn-aumentar" data-index="${index}">+</button>
      </div>
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;
    productosCarrito.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;

  vaciarCarritoBtn.disabled = carrito.length === 0;
  agregarEventosCarrito();
}

function agregarEventosCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const aumentarBtns = document.querySelectorAll(".btn-aumentar");
  aumentarBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      carrito[index].cantidad += 1;
      actualizarCarrito(carrito);
    });
  });

  const disminuirBtns = document.querySelectorAll(".btn-restar");
  disminuirBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
        actualizarCarrito(carrito);
      }
    });
  });

  const eliminarBtns = document.querySelectorAll(".btn-eliminar");
  eliminarBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      carrito.splice(index, 1);
      actualizarCarrito(carrito);
    });
  });
}

function actualizarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

document.addEventListener("DOMContentLoaded", cargarCarrito);
