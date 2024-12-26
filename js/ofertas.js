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
          <p><strong>Precio: $${oferta.precioOferta.toFixed(2)}</strong> (Antes $${oferta.precioOriginal.toFixed(
        2
      )})</p>
          <button class="btn-comprar" data-product="${oferta.id}">¡Aprovechar Oferta!</button>
        `;
      offerCard.insertBefore(imagesContainer, offerCard.querySelector("p"));
      container.appendChild(offerCard);
    });

    // agregarEventosComprar();
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarOfertas();
});
