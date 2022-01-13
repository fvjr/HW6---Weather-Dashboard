var btnSearchCityEl = document.querySelector('#btn-search-city')
var cityInputEl = document.querySelector('#city')
var searchedCityNameEl = document.querySelector('#searched-city-name')

//access these via dom
var currentCityName = document.querySelector('#current-city-name');
var currentCityDate = document.querySelector('#current-city-date');
var currentCityIcon = document.querySelector('#current-city-icon');
var currentCityTemperature = document.querySelector('#current-city-temperature');
var currentCityHumidity = document.querySelector('#current-city-humidity');
var currentCityWindspeed = document.querySelector('#current-city-windspeed');
var currentCityUVIndex = document.querySelector('#current-city-uv-index');

//fin

//open weather api
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//retrieve data from the weather api
fetch(`http://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=c5ac3bf1e2bd986188132643f307e82c`)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  }
  );

//make a function that updates city in fetch url to match user input

//possible to use template literal to have user value input be saved into a variable's value which is then used to check in fetch?
//fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=c5ac3bf1e2bd986188132643f307e82c`)

//function to search city via API
var btnSearchCity = function (event) {
  event.preventDefault();
  

  var city = cityInputEl.value.trim();

  if (city) {
    //get weather via API if searched term is valid
    getCityWeather(city);
    console.log(city);
    // currentCityName.textContent = data.name;
    console.log(currentCityName)


// var currentCityDate = document.querySelector('#current-city-date');
// var currentCityIcon = document.querySelector('#current-city-icon');
// var currentCityTemperature = document.querySelector('#current-city-temperature');
// var currentCityHumidity = document.querySelector('#current-city-humidity');
// var currentCityWindspeed = document.querySelector('#current-city-windspeed');
// var currentCityUVIndex = document.querySelector('#current-city-uv-index');
  } else {
    //if user does not enter a correct city, or no city
    // alert('Invalid - Please enter a city name')
    //change to text content changing to incorrect
    cityInputEl.placeholder = 'Error - no city name entered'
  }
};

//functions

// function to take user input of city name and search it through the open weather API
//a - if incorrect city, display error message
//b - if correct city, pull data for city

var getCityWeather = function (city) {
  var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c5ac3bf1e2bd986188132643f307e82c'

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          // displayWeather(data,city);
    currentCityName.textContent = data.name;
//START
// currentCityDate.textContent = 


// // <img src = 'http://openweathermap.org/img/wn/'></div>
// currentCityIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon);
// }

console.log(data.weather[0].icon);
currentCityIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
console.log(currentCityIcon.src);
currentCityTemperature.textContent = 'Temp: ' + calvinToFarenheit(data.main.temp) + ' °F';
currentCityHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
currentCityWindspeed.textContent = 'Windspeed: ' + data.wind.speed + ' MPH';
// var currentCityUVIndex = document.querySelector('#current-city-uv-index');

//fin

          
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to search city at this time, please try again later');
    }
    );
};

//function to display weather for searched city into a container of info for city's weather on CURRENT DAY
//var displayWeather = function (){}

//function to display 5 day forecast in container for 5 day forecast

//function to dynamically color the UV index depending on if conditions are favorable, moderate, or severe

// function to save previously searched cities in local storage which then shows current and forecast for these cities

btnSearchCityEl.addEventListener('submit', btnSearchCity)

  //main div function creation
  //use bootstrap class to go to right of page

//previous searches div
//use boostrap classes to go to bottom left of page
//for previous searches, I could have 7 buttons be generated already but have them hidden, as they are saved I can toggle classes to make them visible and store info in them

var calvinToFarenheit = function(num) {
  // Fahrenheit	℉=((K-273.15)*1.8)+32
  var newTemp = (((num-273.15)*1.8)+32).toFixed(2)
  console.log(newTemp);
  return newTemp
}

calvinToFarenheit(266.38);

// var getWeatherIcon = function (icon) {
// // <img src = 'http://openweathermap.org/img/wn/'></div>
// currentCityIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon);
// }

// currentCityIcon.getWeatherIcon('01d.png')