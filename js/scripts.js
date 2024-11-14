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

/* CODIGO MODALES PRODUCTO  */
const modal = document.getElementById("product-modal");
const buttons = document.querySelectorAll(".product-card button");
const closeBtn = document.querySelector(".modal-close");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = productsData[index];
    modalTitle.textContent = product.title;
    modalImage.src = product.image;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `Precio: $${product.price}`;

    modal.style.display = "block";
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

const productsData = [
  {
    id: "perfume1",
    title: "Perfume Exótico",
    image: "../img/products/perfume1.jpg",
    description: "Un perfume con notas frescas y exóticas que te cautivarán.",
    price: "49,990",
  },
  {
    id: "perfume2",
    title: "Perfume Floral",
    image: "../img/products/perfume2.jpg",
    description: "Con una fragancia suave y floral, ideal para el día a día.",
    price: "39,990",
  },
  {
    id: "perfume3",
    title: "Perfume Intenso",
    image: "../img/products/perfume3.jpg",
    description: "Un perfume con una esencia intensa y sofisticada.",
    price: "59,990",
  },
  {
    id: "perfume4",
    title: "Perfume Dulce",
    image: "../img/products/perfume4.jpg",
    description: "Una fragancia dulce y envolvente para ocasiones especiales.",
    price: "49,990",
  },
  {
    id: "perfume5",
    title: "Perfume Cítrico",
    image: "../img/products/perfume5.jpg",
    description: "Un aroma fresco y energizante, ideal para el verano.",
    price: "39,990",
  },
  {
    id: "perfume6",
    title: "Perfume Amaderado",
    image: "../img/products/perfume6.png",
    description: "Una fragancia cálida y amaderada que evoca la naturaleza.",
    price: "69,990",
  },
  {
    id: "perfume7",
    title: "Perfume Oriental",
    image: "../img/products/perfume7.jpg",
    description: "Con notas orientales y especiadas para una experiencia única.",
    price: "79,990",
  },
  {
    id: "perfume8",
    title: "Perfume Tropical",
    image: "../img/products/perfume8.jpg",
    description: "Notas frutales y tropicales que te transportan al paraíso.",
    price: "44,990",
  },
  {
    id: "perfume9",
    title: "Perfume Fresco",
    image: "../img/products/perfume9.jpg",
    description: "Una fragancia ligera y refrescante para el día a día.",
    price: "29,990",
  },
];
