function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayGeolocTemp(response) {
  let city = response.data.city;
  let country = response.data.country;
  let iconUrl = response.data.condition.icon_url;
  let description = response.data.condition.description;
  let descriptionFormatted = capitalizeFirstLetter(description);
  let temperature = response.data.temperature.current;
  let tempFormatted = Math.round(temperature);
  let tempUnit = "°C";
  let windUnit = "km/h";
  let wind = response.data.wind.speed;
  let humidity = response.data.temperature.humidity;

  let cityElement = document.querySelector("#current-city");
  let iconElement = document.querySelector("#current-icon");
  let tempElement = document.querySelector("#current-temp");
  let unitElement = document.querySelector("#current-unit");
  let descriptionElement = document.querySelector("#current-description");
  let altElement = document.querySelector("#current-icon");
  let windElement = document.querySelector("#current-wind");
  let humidityElement = document.querySelector("#current-humidity");

  cityElement.innerHTML = `${city}, ${country}`;
  iconElement.setAttribute("src", iconUrl);
  tempElement.innerHTML = tempFormatted;
  unitElement.innerHTML = tempUnit;
  descriptionElement.innerHTML = descriptionFormatted;
  altElement.setAttribute("alt", description);
  windElement.innerHTML = `Wind: ${wind} ${windUnit}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function retrieveGeolocPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "240eof8530cet06fbe36f1fa5d44040b";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?lon=${long}&lat=${lat}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayGeolocTemp);
}
function displayDate() {
  let dateArea = document.querySelector("#current-date");
  dateArea.innerHTML = `${time}`;
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(retrieveGeolocPosition);
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let time = `${day} ${hour}:${minutes}`;

displayDate();
retrievePosition();
