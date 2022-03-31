document.addEventListener("DOMContentLoaded", function () {
  mobile_toggle();

  date_related();
});

function mobile_toggle() {
  document.querySelectorAll("header .toggle img").forEach((element) => {
    element.addEventListener("click", function () {
      document.querySelector("header .links").classList.toggle("open");

      document.querySelectorAll("header .toggle img").forEach((element) => {
        element.classList.toggle("none");
      });
    });
  });
}

function date_related() {
  let current_date = new Date();

  document.querySelector("footer .year").innerHTML = current_date.getFullYear();

  document.querySelector("footer .last-updated").innerHTML =
    document.lastModified;
}
