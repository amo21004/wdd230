document.addEventListener("DOMContentLoaded", function () {
  const data_url = "http://127.0.0.1:5500/json/temples.json";

  fetch(data_url)
    .then((response) => response.json())
    .then((json_object) => {
      const list = document.querySelector(".temples .list");

      let temple_likes_list = localStorage.getItem("temple-likes-list");

      if (!temple_likes_list) {
        temple_likes_list = {};
      } else {
        temple_likes_list = JSON.parse(temple_likes_list);
      }

      var i = 0;

      for (temple of json_object.temples) {
        i++;

        const element = document.createElement("div");

        element.classList.add("temple");

        temple.address = temple.address.replaceAll("\n", "<br>");

        temple.services = temple.services.replaceAll("\n", "<br>");

        temple.ordinance_information = temple.ordinance_information.replaceAll(
          "\n",
          "<br>"
        );

        let liked_class = "";

        if (temple_likes_list[i]) {
          liked_class = "liked";
        }

        element.innerHTML = `
                <h2>${temple.name}</h2>
                <img src="images/temples/${temple.image}" alt="${temple.name}">
                <div class="status"><strong>Status</strong>: ${temple.status}</div>
                <address>${temple.address}</address>
                <a href="tel:${temple.telephone}">${temple.telephone}</a>
                <h3>Services</h3>
                ${temple.services}
                <h3>Ordinance Information</h3>
                <div class="information">${temple.ordinance_information}</div>
                <div class="like"><span class="${liked_class}" data-id="${i}">👍</span></div>
            `;

        list.appendChild(element);
      }

      document
        .querySelectorAll("main .temples .like span")
        .forEach((temple) => {
          temple.addEventListener("click", function () {
            temple.classList.add("liked");

            temple_likes_list[temple.dataset.id] = true;

            localStorage.setItem(
              "temple-likes-list",
              JSON.stringify(temple_likes_list)
            );
          });
        });
    });
});
