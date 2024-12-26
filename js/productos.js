/* FUNCION CARGA PRODUCTOS */
async function cargarProductos() {
  try {
    const response = await fetch("../json/productos.json");
    if (!response.ok) {
      throw new Error("Error al cargar los productos");
    }
    const data = await response.text();
    productos = JSON.parse(data);

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
    mostrarModal();
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

/* FUNCION MOSTRAR MODAL PRODUCTO AGREGADO AL CARRITO */
function mostrarModal() {
  const modal = document.getElementById("modal-agregado");
  const closeBtn = document.getElementById("modal-close");
  const modalContinueBtn = document.getElementById("modal-continue");
  const modalViewCartBtn = document.getElementById("modal-view-cart");

  modal.style.display = "flex";

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalContinueBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalViewCartBtn.addEventListener("click", () => {
    window.location.href = "carrito.html";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
