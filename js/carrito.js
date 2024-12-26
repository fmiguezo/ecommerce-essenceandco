function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productosCarrito = document.getElementById("productos-carrito");
  const totalElement = document.getElementById("total");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  const finalizarCompraBtn = document.getElementById("finalizar-compra");

  productosCarrito.innerHTML = "";

  if (carrito.length === 0) {
    productosCarrito.innerHTML = "<p>No tenés productos en tu carrito.</p>";
    totalElement.textContent = "Total: $0.00";
    vaciarCarritoBtn.classList.add("hidden");
    finalizarCompraBtn.classList.add("hidden");
    return;
  } else {
    vaciarCarritoBtn.classList.remove("hidden");
    finalizarCompraBtn.classList.remove("hidden");
  }

  console.log(carrito);

  let total = 0;
  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("producto-carrito");
    totalPorProducto = producto.precio * producto.cantidad;
    console.log(producto);
    imagen = producto.tipo === "perfume" ? producto.imagen : producto.productos[0].imagen;

    item.innerHTML = `
        <img src="${imagen}" alt="${producto.nombre}">
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

  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  vaciarCarritoBtn.addEventListener("click", () => {
    vaciarCarrito();
  });
}

function actualizarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  cargarCarrito();
}

document.addEventListener("DOMContentLoaded", cargarCarrito);

// Función para finalizar la compra
function finalizarCompra() {
  const modalCompraExitosa = document.getElementById("modal-compra-exitosa");
  modalCompraExitosa.style.display = "block";
  vaciarCarrito();
  console.log("Datos de envío enviados al correo (ficticio).");
}

// Función para cerrar el modal
function cerrarModal() {
  const modalCompraExitosa = document.getElementById("modal-compra-exitosa");
  modalCompraExitosa.style.display = "none";
}

// Evento para el botón de finalizar compra
document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);
document.getElementById("modal-close").addEventListener("click", cerrarModal);
document.getElementById("btn-cerrar-modal").addEventListener("click", cerrarModal);

// Asegúrate de que el modal también se cierre si se hace clic fuera del contenido del modal
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal-compra-exitosa");
  if (event.target === modal) {
    cerrarModal();
  }
});
