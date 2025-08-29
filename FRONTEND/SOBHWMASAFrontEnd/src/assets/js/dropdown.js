document.addEventListener("DOMContentLoaded", function () {
  let dropdowns = document.querySelectorAll(".dropdown-toggle");

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("click", function (event) {
      event.preventDefault();
      let menu = this.nextElementSibling;

      if (!menu.classList.contains("show")) {
        document.querySelectorAll(".dropdown-menu").forEach(function (openMenu) {
          openMenu.classList.remove("show");
        });
      }

      menu.classList.toggle("show");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    let isDropdown = event.target.matches(".dropdown-toggle") || event.target.closest(".dropdown-menu");

    if (!isDropdown) {
      document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
        menu.classList.remove("show");
      });
    }
  });
});
