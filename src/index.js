async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=myKEY&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherData = await response.json();
    console.log(weatherData);

    const city = weatherData.resolvedAddress;
    const temp = weatherData.currentConditions.temp;
    const condition = weatherData.currentConditions.conditions;
    const humidity = weatherData.currentConditions.humidity;

    const currentWeather = new Weather(
        city,
        temp,
        condition,
        humidity
    )    
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
    console.log(searchResult);
}