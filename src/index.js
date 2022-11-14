/* const date = new Date("October 15, 2025 05:04:00");

const minutes = String(date.getMinutes()).padStart(2, "0");
console.log(minutes); // 👉️ 04 */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayGeolocTemp(response) {
  displayDate();
  let city = response.data.city;
  /*   let cityTime = response.data.time;
  let cityDate = new Date(cityTime);
  let day = days[cityDate.getDay()];
  let hour = cityDate.getHours();
  let minutes = String(cityDate.getMinutes()).padStart(2, "0");
  let displayedDate = `${day} ${hour}:${minutes}`; */
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
  let dateElement = document.querySelector("#current-date");

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
  dateArea.innerHTML = `Last updated: ${time}`;
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(retrieveGeolocPosition);
}

function search(city) {
  let apiKey = "240eof8530cet06fbe36f1fa5d44040b";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayGeolocTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
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
let minutes = String(now.getMinutes()).padStart(2, "0");
let time = `${day} ${hour}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

retrievePosition();
