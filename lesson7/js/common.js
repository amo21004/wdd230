window.addEventListener("DOMContentLoaded", () => {
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
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          load_image(item.target);
          observer.unobserve(item.target);
        }
      });
    }, {rootMargin: '0px 0px 100px 0px'});

    images.forEach((image) => {
      observer.observe(image);
    });
  } else {
    images.forEach((image) => {
      load_image(image);
    });
  }
});
