window.addEventListener("DOMContentLoaded", function () {
  const requestURL = "https://amo21004.github.io/wdd230/chamber/data.json";
  //const requestURL = "http://127.0.0.1:5500/data.json";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      const listings = jsonObject["listings"]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      listings_sorted = [];

      let counter = 0;

      listings.every((listing) => {
        if (listing.featured) {
          listings_sorted.push(listing);

          counter++;
        }

        if (counter == 3) return false;

        return true;
      });

      listings_sorted.forEach((listing) => {
        let item = document.createElement("section");

        let image = document.createElement("img");

        image.src = listing.logo_url;

        item.appendChild(image);

        let h3 = document.createElement("h3");

        h3.textContent = listing.name;

        item.appendChild(h3);

        let address = document.createElement("address");

        address.textContent = listing.address;

        item.appendChild(address);

        let hr = document.createElement("hr");

        item.appendChild(hr);

        let phone = document.createElement("a");

        phone.textContent = listing.phone_number;

        phone.href = "tel:" + listing.phone_number;

        let website = document.createElement("a");

        website.textContent = listing.website_url
          .replace("https://", "")
          .replace("http://", "")
          .replace("/", "");

        website.href = listing.website_url;

        let links = document.createElement("div");

        links.className = "links";

        links.appendChild(phone);

        links.appendChild(document.createTextNode(" | "));

        links.appendChild(website);

        item.appendChild(links);

        document.querySelector("main .spotlight").appendChild(item);
      });
    });
});
