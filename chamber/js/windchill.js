window.addEventListener("DOMContentLoaded", function () {
  const temperature = document.querySelector(
    "main .weather .temperature-widget .temperature .value span"
  ).innerText;

  const speed = document.querySelector(
    "main .weather .temperature-widget .wind-speed"
  ).innerText;

  wind_chill = calculate_wind_chill(temperature, speed);

  if (wind_chill) {
    document.querySelector(
      "main .weather .temperature-widget .wind-chill"
    ).innerText = wind_chill;
  }
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
