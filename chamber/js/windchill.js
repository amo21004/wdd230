window.addEventListener("DOMContentLoaded", function () {
  const apiURL =
    "https://api.openweathermap.org/data/2.5/weather?id=1269843&units=metric&appid=2c9072d3042deb6c2e93339a55255572";

  fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
      const temperature = jsObject.main.temp;

      document.querySelector(
        "main .weather .temperature-widget .temperature .value span"
      ).innerText = temperature;

      const speed = jsObject.wind.speed;

      document.querySelector(
        "main .weather .temperature-widget .wind-speed"
      ).innerText = speed;

      document.querySelector(
        "main .weather .temperature-widget .summary"
      ).innerText = jsObject.weather[0].description;

      document.querySelector(
        "main .weather .temperature-widget img"
      ).src = `https://openweathermap.org/img/w/${jsObject.weather[0].icon}.png`;

      wind_chill = calculate_wind_chill(temperature, speed);

      if (wind_chill) {
        document.querySelector(
          "main .weather .temperature-widget .wind-chill"
        ).innerText = wind_chill;
      }
    });
});

function calculate_wind_chill(t, s) {
  if (t <= 50 && s >= 3) {
    return (
      35.74 +
      0.6215 * t -
      35.75 * s ** 0.16 +
      0.4275 * t * s ** 0.16
    ).toFixed(2);
  }

  return false;
}
