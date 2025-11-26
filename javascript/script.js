//const weatherResult = document.getElementById("weatherResult");

//fetching api that converts the city name to altitude and longitude values
async function getWeather(cityName) {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    //checking if the city name exists or not + validating
    if (!geoData.results || geoData.results.length === 0) {
      console.log("City not found!");
      return;
    }
    const { latitude, longitude, name, country } = geoData.results[0];

    //fetching weather api
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    //displaying the result
    console.log(`City: ${name},${country}`);
    console.log(`Temperature: ${weatherData.current_weather.temperature}°C`);
    console.log(`Wind: ${weatherData.current_weather.windspeed} km/h`);
  } catch (err) {
    console.log("Error!", err);
  }
}

getWeather("kathmandu");
