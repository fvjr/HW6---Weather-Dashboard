//moment
var date = moment();
//acess elements by DOM
var btnSearchCityEl = document.querySelector('#btn-search-city')
var cityInputEl = document.querySelector('#city')
var searchedCityNameEl = document.querySelector('#searched-city-name')
var currentCityContainer = document.querySelector('#current-city-weather');
var currentCityName = document.querySelector('#current-city-name');
var currentCityDate = document.querySelector('#current-city-date');
var currentCityIcon = document.querySelector('#current-city-icon');
var currentCityTemperature = document.querySelector('#current-city-temperature');
var currentCityHumidity = document.querySelector('#current-city-humidity');
var currentCityWindspeed = document.querySelector('#current-city-windspeed');
var currentCityUVIndex = document.querySelector('#current-city-uv-index');
var forecastContainer = document.querySelector('#city-5-day-forecast-container')

//open weather api
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//retrieve data from the weather api
// fetch(`http://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=c5ac3bf1e2bd986188132643f307e82c`)
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   }
//   );

//function to search city via API
var btnSearchCity = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
    console.log(city);
  } else {
    cityInputEl.placeholder = 'Error - no city name entered'
  }
};

// function to take user input of city name and search it through the open weather API
var getCityWeather = function (city) {
  var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=c5ac3bf1e2bd986188132643f307e82c'
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          currentCityName.textContent = data.name;
          currentCityDate.textContent = date.add(10, 'days').calendar();
          currentCityIcon.classList.remove("hide");
          currentCityIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
          currentCityIcon.setAttribute('style', 'background-color: red');
          currentCityName.append(currentCityIcon);
          currentCityTemperature.textContent = 'Temp: ' + data.main.temp + ' °F';
          currentCityHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
          currentCityWindspeed.textContent = 'Windspeed: ' + data.wind.speed + ' MPH';
          console.log(data.coord.lat, data.coord.lon); findUVIndex(data.coord.lat, data.coord.lon);
          getForecast(data.coord.lat, data.coord.lon);
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

var getForecast = function (lat,lon) {
  var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly&appid=c5ac3bf1e2bd986188132643f307e82c'
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(response)
          console.log(data)
          createForecastCards(data.daily[0].temp.max, data.daily[0].wind_speed, data.daily[0].humidity);
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

//creating logic for forecast card creation

//to do
//change li's back to h3
//

//function to display 5 day forecast in container for 5 day forecast
//var createForecast = function (date, weatherIcon, temperature, windSpeed, humidity);

//date
//weather icon
//temperature
//wind-speed
//humidity

var createForecastCards = function (temperature, windSpeed, humidity) {
  var forecastCard = document.createElement("div");
  forecastCard.classList.add("card");
  forecastCard.classList.add("forecast-card");
  forecastCard.setAttribute('style', 'width: 18rem');
  forecastContainer.append(forecastCard);
  var foreCastCardUL = document.createElement('ul');
  foreCastCardUL.classList.add("list-group");
  foreCastCardUL.classList.add("list-group-flush")
  forecastCard.append(foreCastCardUL)
  var forecastCardDate = document.createElement("li");
  forecastCardDate.textContent = 'date';
  forecastCardDate.classList.add("list-group-item");
  foreCastCardUL.append(forecastCardDate);
  var forecastCardWeatherIcon = document.createElement("li");
  forecastCardWeatherIcon.textContent = 'IMG PLACEHOLDER';
  forecastCardWeatherIcon.classList.add('list-group-item');
  foreCastCardUL.append(forecastCardWeatherIcon);
  var forecastCardTemperature = document.createElement("li");
  forecastCardTemperature.textContent = 'temp' + temperature;
  forecastCardTemperature.classList.add('list-group-item');
  foreCastCardUL.append(forecastCardTemperature);
  var forecastCardWindSpeed = document.createElement("li");
  forecastCardWindSpeed.textContent = 'WINDSPEED PLACEHOLDER' + windSpeed;
  forecastCardWindSpeed.classList.add('list-group-item');
  foreCastCardUL.append(forecastCardWindSpeed);
  var forecastCardHumidity = document.createElement("li");
  forecastCardHumidity.textContent = 'HUMIDITY PLACEHOLDER' + humidity;
  foreCastCardUL.append(forecastCardHumidity);
  forecastCardHumidity.classList.add('list-group-item');
}
//create container/card
//date
//weather icon
//temperature
//wind-speed
//humidity

// createForecastCards();
// createForecastCards();
// createForecastCards();
// createForecastCards();
// createForecastCards();

//function to dynamically color the UV index depending on if conditions are favorable, moderate, or severe

// function to save previously searched cities in local storage which then shows current and forecast for these cities

btnSearchCityEl.addEventListener('submit', btnSearchCity)

//main div function creation
//use bootstrap class to go to right of page

//previous searches div
//use boostrap classes to go to bottom left of page
//for previous searches, I could have 7 buttons be generated already but have them hidden, as they are saved I can toggle classes to make them visible and store info in them

var calvinToFarenheit = function (num) {
  // Fahrenheit	℉=((K-273.15)*1.8)+32
  var newTemp = (((num - 273.15) * 1.8) + 32).toFixed(2)
  return newTemp
}

// function to get UV index
var findUVIndex = function (lat, lon) {
  var uvindex;
  var UVIndexURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely,daily&appid=c5ac3bf1e2bd986188132643f307e82c';
  fetch(UVIndexURL)
    .then(function (response) {
      // if (response.ok) {
      response.json().then(function (data) {
        console.log(data)
        uvindex = data.current.uvi;
        console.log(uvindex)
        currentCityUVIndex.textContent = 'UV Index: ' + uvindex;
        //write logic for color-coding UV-Index
        if (uvindex < 3) {
          currentCityUVIndex.classList.add('.uvindex-favorable');
        } else if (uvindex > 3 && uvindex < 6) {
          currentCityUVIndex.classList.add('uvindex-moderate');
        } else {
          currentCityUVIndex.classList.add('uvindex-severe');
        }
      }
      )
      //  }
    })
  return uvindex
}

//use one call for count
//example:   var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly&appid=c5ac3bf1e2bd986188132643f307e82c'
//use inline class for cards
//use moment for time
//moment documntation - in for loop add one day 
//local storage class video helpful 