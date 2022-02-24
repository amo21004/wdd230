document.addEventListener("DOMContentLoaded", function () {
  mobile_toggle();

  date_related();

  page_hits();

  load_images();

  join_current_date();
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
}

function page_hits() {
  if (!document.querySelector("#page-hits")) {
    return;
  }

  var page_hits = localStorage.getItem("discover-page-hits");

  if (!page_hits) {
    page_hits = 0;
  }

  page_hits++;

  localStorage.setItem("discover-page-hits", page_hits);

  document.querySelector("#page-hits").innerText = page_hits;
}

function load_images() {
  const images = document.querySelectorAll("picture img[data-src]");

  const load_image = (image) => {
    // return in case data-src attribute is empty
    if (!image.getAttribute("data-src")) {
      return;
    }

    image.src = image.getAttribute("data-src");

    image.removeAttribute("data-src");
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (items, observer) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            load_image(item.target);
            observer.unobserve(item.target);
          }
        });
      },
      { rootMargin: "0px 0px 250px 0px" }
    );

    images.forEach((image) => {
      observer.observe(image);
    });
  } else {
    images.forEach((image) => {
      load_image(image);
    });
  }
}

function join_current_date() {
  if (!document.querySelector('form input[name="current_date"]')) {
    return;
  }

  document.querySelector('form input[name="current_date"]').value = new Date();
}
