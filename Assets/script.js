//moment
var date = moment();
moment().format("MMM Do YY");
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
var cityData = JSON.parse(localStorage.getItem('city')) || [];

var searchedCityContainer = document.querySelector('#previous-container');



//access cards via DOM
var cardOne = [
  cardOneDate = document.querySelector('#card-1-date'),
  cardOneWeatherIcon = document.querySelector('#card-1-weather-icon'),
  cardOneTemperature = document.querySelector('#card-1-temperature'),
  cardOneWindSpeed = document.querySelector('#card-1-wind-speed'),
  cardOneHumidity = document.querySelector('#card-1-humidity'),
]
var cardTwo = [
  cardTwoDate = document.querySelector('#card-2-date'),
  cardTwoWeatherIcon = document.querySelector('#card-2-weather-icon'),
  cardTwoTemperature = document.querySelector('#card-2-temperature'),
  cardTwoWindSpeed = document.querySelector('#card-2-wind-speed'),
  cardTwoHumidity = document.querySelector('#card-2-humidity'),
]
var cardThree = [
  cardThreeDate = document.querySelector('#card-3-date'),
  cardThreeWeatherIcon = document.querySelector('#card-3-weather-icon'),
  cardThreeTemperature = document.querySelector('#card-3-temperature'),
  cardThreeWindSpeed = document.querySelector('#card-3-wind-speed'),
  cardThreeHumidity = document.querySelector('#card-3-humidity'),
]
var cardFour = [
  cardFourDate = document.querySelector('#card-4-date'),
  cardFourWeatherIcon = document.querySelector('#card-4-weather-icon'),
  cardFourTemperature = document.querySelector('#card-4-temperature'),
  cardFourWindSpeed = document.querySelector('#card-4-wind-speed'),
  cardFourHumidity = document.querySelector('#card-4-humidity'),
]
var cardFive = [
  cardFiveDate = document.querySelector('#card-5-date'),
  cardFiveWeatherIcon = document.querySelector('#card-5-weather-icon'),
  cardFiveTemperature = document.querySelector('#card-5-temperature'),
  cardFiveWindSpeed = document.querySelector('#card-5-wind-speed'),
  cardFiveHumidity = document.querySelector('#card-5-humidity'),
]

//function to search city via API
var btnSearchCity = function (event) {
  event.preventDefault();
  //  console.log(event.target);

  showCitySearch();
  var city = cityInputEl.value.trim();
  // console.log(city);
  if (city) {
    getCityWeather(city);
  } else {
    cityInputEl.placeholder = 'No city name entered'
  }
};

// function to take user input of city name and search it through the open weather API
var getCityWeather = function (city) {
  var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=c5ac3bf1e2bd986188132643f307e82c'
  cityData.push(city)
  cityInputEl.val = '';
  localStorage.setItem("city", JSON.stringify(cityData))
  if (city !== "") {
    fetch(apiURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data)
            currentCityDate.textContent = date.add(0, 'days').calendar();
            currentCityIcon.classList.remove("hide");
            currentCityIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
            currentCityTemperature.textContent = 'Temp: ' + data.main.temp + ' °F';
            currentCityHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
            currentCityWindspeed.textContent = 'Windspeed: ' + data.wind.speed + ' MPH';
            findUVIndex(data.coord.lat, data.coord.lon);
            getForecast(data.coord.lat, data.coord.lon);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        // alert('Unable to search city at this time, please try again later');
        console.log(error);
      });
  }
};

var getForecast = function (lat, lon) {
  var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly&appid=c5ac3bf1e2bd986188132643f307e82c'
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          makeForecastCardOne(data.daily[0].dt, data.daily[0].weather[0].icon, data.daily[0].temp.day, data.daily[0].wind_speed, data.daily[0].humidity);
          makeForecastCardTwo(data.daily[1].dt, data.daily[1].weather[0].icon, data.daily[1].temp.day, data.daily[1].wind_speed, data.daily[1].humidity)
          makeForecastCardThree(data.daily[2].dt, data.daily[2].weather[0].icon, data.daily[2].temp.day, data.daily[2].wind_speed, data.daily[2].humidity)
          makeForecastCardFour(data.daily[3].dt, data.daily[3].weather[0].icon, data.daily[3].temp.day, data.daily[3].wind_speed, data.daily[3].humidity)
          makeForecastCardFive(data.daily[4].dt, data.daily[4].weather[0].icon, data.daily[4].temp.day, data.daily[4].wind_speed, data.daily[4].humidity)
        });
      } else {
        console.log('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      // alert('Unable to search city at this time, please try again later');
      console.log(error)
    }
    );
};

btnSearchCityEl.addEventListener("submit", btnSearchCity)

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

//functions to make forecast cards -> could be improved through use of for-loop
var makeForecastCardOne = function (date, imgSource, temperature, windSpeed, humidity) {
  //converting unixTiestamp to EST
  var unixTimestamp;
  unixTimestamp = date
  var milliseconds = unixTimestamp * 1000
  var dateObject = new Date(milliseconds)
  var humanDateFormat = dateObject.toLocaleString()

  cardOneDate.textContent = humanDateFormat;
  cardOneWeatherIcon.src = 'http://openweathermap.org/img/wn/' + imgSource + '.png';
  cardOneTemperature.textContent = 'Temperature: ' + temperature + '°F';
  cardOneWindSpeed.textContent = 'Wind: ' + windSpeed + ' MPH';
  cardOneHumidity.textContent = 'Humidity: ' + humidity + '%';


}
var makeForecastCardTwo = function (date, imgSource, temperature, windSpeed, humidity) {

  var unixTimestamp;
  unixTimestamp = date
  var milliseconds = unixTimestamp * 1000
  var dateObject = new Date(milliseconds)
  var humanDateFormat = dateObject.toLocaleString()

  cardTwoDate.textContent = humanDateFormat;
  cardTwoWeatherIcon.src = 'http://openweathermap.org/img/wn/' + imgSource + '.png';
  cardTwoTemperature.textContent = 'Temperature: ' + temperature + '°F';
  cardTwoWindSpeed.textContent = 'Wind: ' + windSpeed + ' MPH';
  cardTwoHumidity.textContent = 'Humidity: ' + humidity + '%';
}
var makeForecastCardThree = function (date, imgSource, temperature, windSpeed, humidity) {
  var unixTimestamp;
  unixTimestamp = date
  var milliseconds = unixTimestamp * 1000
  var dateObject = new Date(milliseconds)
  var humanDateFormat = dateObject.toLocaleString()

  cardThreeDate.textContent = humanDateFormat;
  cardThreeWeatherIcon.src = 'http://openweathermap.org/img/wn/' + imgSource + '.png';
  cardThreeTemperature.textContent = 'Temperature: ' + temperature + '°F';
  cardThreeWindSpeed.textContent = 'Wind: ' + windSpeed + ' MPH';
  cardThreeHumidity.textContent = 'Humidity: ' + humidity + '%';
}
var makeForecastCardFour = function (date, imgSource, temperature, windSpeed, humidity) {
  var unixTimestamp;
  unixTimestamp = date
  var milliseconds = unixTimestamp * 1000
  var dateObject = new Date(milliseconds)
  var humanDateFormat = dateObject.toLocaleString()

  cardFourDate.textContent = humanDateFormat;
  cardFourWeatherIcon.src = 'http://openweathermap.org/img/wn/' + imgSource + '.png';
  cardFourTemperature.textContent = 'Temperature: ' + temperature + '°F';
  cardFourWindSpeed.textContent = 'Wind: ' + windSpeed + ' MPH';
  cardFourHumidity.textContent = 'Humidity: ' + humidity + '%';
}
var makeForecastCardFive = function (date, imgSource, temperature, windSpeed, humidity) {
  var unixTimestamp;
  unixTimestamp = date
  var milliseconds = unixTimestamp * 1000
  var dateObject = new Date(milliseconds)
  var humanDateFormat = dateObject.toLocaleString()

  cardFiveDate.textContent = humanDateFormat;
  cardFiveWeatherIcon.src = 'http://openweathermap.org/img/wn/' + imgSource + '.png';
  cardFiveTemperature.textContent = 'Temperature: ' + temperature + '°F';
  cardFiveWindSpeed.textContent = 'Wind: ' + windSpeed + ' MPH';
  cardFiveHumidity.textContent = 'Humidity: ' + humidity + '%';
}

function showCitySearch() {
  //get previously searched cities
var buttonContainer = document.querySelector('.searched-container');
buttonContainer.innerHTML ='';
cityData.forEach(function(city){
var button = document.createElement('button');
button.textContent = city;
button.setAttribute('class', 'btn btn-primary');
button.setAttribute('data-city', city);
button.onclick = function(){
  console.log(city);
};

buttonContainer.appendChild(button)
})




}

showCitySearch();






//define what you're looking for, create variable to get it, console.log a variable to make sure it's not undefined or null, use the variable 

// {
  // if (searchedCityContainer.hasChildNodes()) {
  //   while (searchedCityContainer.firstChild) {
  //     searchedCityContainer.removeChild(searchedCityContainer.lastChild);
  //   }
  // }
  // var searchedCities = JSON.parse(localStorage.getItem("city"));
  // if (searchedCities !== null) {
  //   cityData = searchedCities
  //   for (let i = 0; i < searchedCities.length; i++) {
  //     var searchedCityButton = document.createElement("button");
  //     searchedCityButton.textContent = searchedCities[i];
  //     searchedCityButton.addEventListener("submit", function (city) {
  //       cityInputEl.val = this.textContent
  //       console.log(city);
        // getCityWeather(city)
      // })

      // searchedCityContainer.appendChild(searchedCityButton)
      // searchedCityButton.classList.add('searched');
      // searchedCityButton.classList.add('col');

//     }
//   }
// }
