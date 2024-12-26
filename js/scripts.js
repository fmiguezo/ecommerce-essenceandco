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
