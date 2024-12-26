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

/* CODIGO CARGA PRODUCTOS */
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
        <button class="btn-ver-mas" data-product="${producto.id}">Ver más</button>
        <button class="btn-comprar" data-product="${producto.id}">Comprar</button>
      `;
      container.appendChild(productCard);
    });

    agregarEventosModal();
    // agregarEventosCarrito();
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

/* FUNCION PARA AGREGAR EVENTOS AL MODAL */
function agregarEventosModal() {
  const modal = document.getElementById("product-modal");
  const buttons = document.querySelectorAll(".product-card .btn-ver-mas");
  const closeBtn = document.querySelector(".modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalPrice = document.getElementById("modal-price");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-product");
      console.log("ID del Producto:", productId);

      const producto = productos.find((p) => p.id === productId);
      console.log("Producto encontrado:", producto);

      if (producto) {
        modalTitle.textContent = producto.nombre;
        modalImage.src = producto.imagen;
        modalDescription.textContent = producto.descripcion;
        modalPrice.textContent = `Precio: ${producto.precio}`;

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
}
