window.addEventListener("DOMContentLoaded", () => {
  const requestURL =
    "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      const prophets = jsonObject["prophets"];

      prophets.forEach(displayProphets);

      lady_load();
    });

  function displayProphets(prophet) {
    // Create elements to add to the document
    let card = document.createElement("section");
    let h2 = document.createElement("h2");
    let image = document.createElement("img");
    var date_of_birth = document.createElement("div");
    var place_of_birth = document.createElement("div");

    // Change the textContent property of the h2 element to contain the prophet's full name
    h2.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values.
    image.setAttribute("src", "images/placeholder.svg");
    image.setAttribute("data-src", prophet.imageurl);
    image.setAttribute(
      "alt",
      `Portait of ${prophet.name} ${prophet.lastname} - ${ordinal_suffix_of(
        prophet.order
      )} Latter-day President`
    );
    image.setAttribute(
      "title",
      `Portait of ${prophet.name} ${prophet.lastname} - ${ordinal_suffix_of(
        prophet.order
      )} Latter-day President`
    );
    image.setAttribute("loading", "lazy");

    date_of_birth.textContent = `Date of Birth: ${prophet.birthdate}`;
    date_of_birth.className = "birth";

    place_of_birth.textContent = `Place of Birth: ${prophet.birthplace}`;
    place_of_birth.className = "birth";

    // Add/append the section(card) with the h2 element
    card.appendChild(h2);
    card.appendChild(date_of_birth);
    card.appendChild(place_of_birth);
    card.appendChild(image);

    // Add/append the existing HTML div with the cards class with the section(card)
    document.querySelector("div.cards").appendChild(card);
  }

  // gets ordinal suffix of a given number
  // credits to https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586#13627586
  function ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  function lady_load() {
    const images = document.querySelectorAll("img[loading]");

    const load_image = (image) => {
      // return in case data-src attribute is empty
      if (!image.getAttribute("data-src")) {
        return;
      }

      image.src = image.getAttribute("data-src");

      image.removeAttribute("data-src");

      image.removeAttribute("loading");
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
        { rootMargin: "0px 0px 100px 0px" }
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
});
