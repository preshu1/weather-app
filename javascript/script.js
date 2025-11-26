//selecting
const cityInput = document.getElementById("cityInput");
const getWeatherbtn = document.getElementById("getWeatherbtn");
const weatherResult = document.getElementById("weatherResult");
const resetBtn = document.getElementById("reset");

//fetching api that converts the city name to altitude and longitude values
async function getWeather(cityName) {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    //checking if the city name exists or not + validating
    if (!geoData.results || geoData.results.length === 0) {
      weatherResult.innerHTML = `<p>City Not Found!</p>`;
      return;
    }
    const { latitude, longitude, name, country } = geoData.results[0];

    //fetching weather api
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    const weather = weatherData.current_weather;

    //displaying weather dynamically using map and join method
    const weatherInfo = Object.entries(weather)
      .map(([Key, value]) => {
        return `<div class="weather-item"><strong>${Key}</strong>: ${value}</div>`;
      })
      .join("");

    //show city name and country
    weatherResult.innerHTML = `<h2 class="heading">Weather in ${name}, ${country}</h2>${weatherInfo}`;
    cityInput.value = "";
    cityInput.focus();

    //hide input and button to focus on result
    resetBtn.style.display = "block";
    cityInput.style.display = "none";
    getWeatherbtn.style.display = "none";
  } catch (err) {
    weatherResult.innerHTML = `<p>Error Fetching Weather</p>`;
    console.error(err);
  }
}

//button click event
getWeatherbtn.addEventListener("click", async () => {
  const city = cityInput.value;
  if (!city) {
    weatherResult.innerHTML = `<p style="color: red; font-size: 18px;">Please enter a city</p>`;

    cityInput.focus();
    return;
  }

  getWeather(city);
});

resetBtn.addEventListener("click", () => {
  weatherResult.innerHTML = ""; // clear the weather card
  cityInput.value = ""; // clear input
  cityInput.style.display = "inline-block"; //  hidden earlier
  getWeatherbtn.style.display = "inline-block"; //  hidden earlier
  cityInput.focus(); // focus input
  resetBtn.style.display = "none";
});
