document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("header .toggle img").forEach((element) => {
    element.addEventListener("click", function () {
      document.querySelector("header .links").classList.toggle("open");

      document.querySelectorAll("header .toggle img").forEach((element) => {
        element.classList.toggle("none");
      });
    });
  });

  let current_date = new Date();

  if (current_date.getDay() == 1 || current_date.getDay() == 2) {
    document.querySelector(".cta").style.display = "block";
  }

  document.querySelector("header .current-date").innerHTML =
    new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
      current_date
    );

  document.querySelector("footer .year").innerHTML = current_date.getFullYear();

  document.querySelector("footer .last-updated").innerHTML =
    document.lastModified;
});
