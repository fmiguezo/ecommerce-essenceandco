/* FUNCION CARGA OFERTAS */
async function cargarOfertas() {
  try {
    const response = await fetch("../json/ofertas.json");
    if (!response.ok) {
      throw new Error("Error al cargar las ofertas");
    }
    const data = await response.text();
    ofertas = JSON.parse(data);

    const container = document.getElementById("offers-container");

    ofertas.forEach((oferta) => {
      const offerCard = document.createElement("div");
      offerCard.classList.add("offer-card");

      const imagesContainer = document.createElement("div");
      imagesContainer.classList.add("offer-images");

      oferta.productos.forEach((producto) => {
        const productImage = document.createElement("img");
        productImage.src = producto.imagen;
        productImage.alt = producto.nombre;
        imagesContainer.appendChild(productImage);
      });

      offerCard.innerHTML = `
            <h3>${oferta.nombre}</h3>
            <p><strong>Precio: $${oferta.precio.toFixed(2)}</strong> (Antes $${oferta.precioOriginal.toFixed(2)})</p>
            <button class="btn-comprar" data-product="${oferta.id}">¡Aprovechar Oferta!</button>
          `;

      offerCard.insertBefore(imagesContainer, offerCard.querySelector("p"));
      container.appendChild(offerCard);

      const btnComprar = offerCard.querySelector(".btn-comprar");
      btnComprar.addEventListener("click", () => {
        agregarAlCarrito(oferta.id);
      });
    });
  } catch (error) {
    console.error("Error cargando las ofertas:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarOfertas();
});

/* FUNCION PARA AGREGAR AL CARRITO */
function agregarAlCarrito(productId) {
  const oferta = ofertas.find((oferta) => oferta.id === productId);

  if (oferta) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const ofertaExistente = carrito.find((p) => p.id === oferta.id);

    if (ofertaExistente) {
      ofertaExistente.cantidad += 1;
    } else {
      oferta.cantidad = 1;
      carrito.push(oferta);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarModal();
  }
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
