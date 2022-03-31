document.addEventListener("DOMContentLoaded", function () {
  const api_url =
    "https://api.openweathermap.org/data/2.5/onecall?appid=2c9072d3042deb6c2e93339a55255572&lat=38.984722&lon=-77.113056&units=imperial";

  fetch(api_url)
    .then((response) => response.json())
    .then((json_object) => {
      const temperature_forecast = document.querySelector(
        ".temperature-forecast .list"
      );

      for (day of json_object.daily.slice(0, 4)) {
        const element = document.createElement("div");

        element.classList.add("item");

        const icon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;

        const date = new Date(day.dt * 1000);

        element.innerHTML = `
          ${date.toLocaleDateString("en-US", {
            weekday: "long",
          })} ${date.getMonth()}/${date.getDate()}/${date.getYear()}<br>
          ${day.temp.min} °F / ${day.temp.max} °F<br>
          <strong>${day.weather[0].description}</strong><br>
          <img src="${icon}" alt="">
        `;

        temperature_forecast.appendChild(element);
      }

      if (localStorage.getItem("is-current-temperature-hidden") == "yes") {
        return;
      }

      const temperature = json_object.current.temp;

      const humidity = json_object.current.humidity;

      const description = json_object.current.weather[0].description;

      const icon = `https://openweathermap.org/img/w/${json_object.current.weather[0].icon}.png`;

      document.querySelector(".current-temperature span").innerHTML = `
        ${temperature} °F - ${humidity}% - ${description} <img src="${icon}" alt="">
      `;

      document
        .querySelector(".current-temperature")
        .classList.add("is-visible");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".current-temperature .close")
    .addEventListener("click", function () {
      localStorage.setItem("is-current-temperature-hidden", "yes");

      document
        .querySelector(".current-temperature")
        .classList.remove("is-visible");
    });
});
