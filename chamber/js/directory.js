window.addEventListener("DOMContentLoaded", function () {
  const requestURL = "https://amo21004.github.io/wdd230/chamber/data.json";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      const listings = jsonObject["listings"];

      listings.forEach((listing) => {
        let item = document.createElement("section");

        let image = document.createElement("img");

        image.src = listing.logo_url;

        image.alt = listing.name;

        item.appendChild(image);

        let h2 = document.createElement("h2");

        h2.textContent = listing.name;

        item.appendChild(h2);

        let address = document.createElement("address");

        address.textContent = listing.address;

        item.appendChild(address);

        let phone = document.createElement("a");

        phone.textContent = listing.phone_number;

        phone.href = "tel:" + listing.phone_number;

        item.appendChild(phone);

        let website = document.createElement("a");

        website.textContent = listing.website_url
          .replace("https://", "")
          .replace("http://", "")
          .replace("/", "");

        website.href = listing.website_url;

        item.appendChild(website);

        document.querySelector("main .listings").appendChild(item);
      });
    });

  document.querySelectorAll("main .view-mode img").forEach((item) => {
    item.addEventListener("click", function () {
      if (this.getAttribute("data-mode") == "grid") {
        document.querySelector("main .listings").className =
          "listings listings-grid";
      } else if (this.getAttribute("data-mode") == "list") {
        document.querySelector("main .listings").className =
          "listings listings-list";
      }
    });
  });

  if (window.screen.width >= 1000) {
    document.querySelector("main .listings").className =
      "listings listings-grid";
  } else {
    document.querySelector("main .listings").className =
      "listings listings-list";
  }
});
