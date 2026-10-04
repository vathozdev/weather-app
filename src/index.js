async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=REMOVED_API_KEY&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherData = await response.json();

    const city = weatherData.resolvedAddress;
    const temp = weatherData.currentConditions.temp;
    const condition = weatherData.currentConditions.conditions;
    const humidity = weatherData.currentConditions.humidity;

    const currentWeather = new Weather(city, temp, condition, humidity);
    return currentWeather;
  } catch (error) {
    console.error("Failed to fetch user data:", error.message);
  }
}
class Weather {
  constructor(city, temp, condition, humidity) {
    this.city = city;
    this.temp = temp;
    this.condition = condition;
    this.humidity = humidity;
  }
}

async function searchWeather(location) {
  const searchResult = await getWeatherData(location);
  clearingPage();
  displayingWeather(searchResult);
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const locationInput = document.getElementById("location");
  const location = locationInput.value.trim();
  if (location) {
    searchWeather(location);
  }
});

function displayingWeather(weather) {
  const container = document.querySelector("#container");
  const weatherDataContainer = document.createElement("div");
  weatherDataContainer.classList.add("weather-data-container");
  container.appendChild(weatherDataContainer);

  const cityName = document.createElement("p");
  cityName.classList.add("containerparas");
  cityName.textContent = weather.city;

  const tempValue = document.createElement("p");
  tempValue.classList.add("containerparas");
  tempValue.textContent = weather.temp;

  const conditionCard = document.createElement("div");
  conditionCard.classList.add("condition-card");
  const conditionText = document.createElement("p");
  conditionText.classList.add("containerparas");
  conditionText.textContent = weather.condition;
  conditionCard.appendChild(conditionText);

  const humidityValue = document.createElement("p");
  humidityValue.classList.add("containerparas");
  humidityValue.textContent = weather.humidity;

  weatherDataContainer.append(
    cityName,
    tempValue,
    conditionCard,
    humidityValue,
  );
}

function clearingPage() {
  const weatherDataContainer = document.querySelector(
    ".weather-data-container",
  );
  if (weatherDataContainer) {
    weatherDataContainer.remove();
  }
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

const toggleBtn = document.querySelector("#toggleButton");
  toggleBtn.addEventListener("click", () => {
    const isFahrenheit = toggleBtn.textContent === "F";
    if (isFahrenheit) {
      toggleBtn.textContent = "C";

    } else {
      toggleBtn.textContent = "F";
      fahrenheitToCelsius(fahrenheit);
    }
  })
