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
