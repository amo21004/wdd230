window.addEventListener("DOMContentLoaded", () => {
  const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks, Alaska&units=imperial&appid=2c9072d3042deb6c2e93339a55255572';

  fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    document.querySelector('#current-temp').textContent = jsObject.main.temp;

    const iconsrc= `https://openweathermap.org/img/w/${jsObject.weather[0].icon}.png`;

    const desc = jsObject.weather[0].description;

    document.querySelector('#icon-src').textContent = iconsrc;

    document.querySelector('#weathericon').setAttribute('src', iconsrc);

    document.querySelector('#weathericon').setAttribute('alt', desc);

    document.querySelector('figcaption').textContent = desc;
  });
});
