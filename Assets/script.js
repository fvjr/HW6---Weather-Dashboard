var inputFormEl = document.querySelector('#input-form')
var cityInputEl = document.querySelector('#city')



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
  var formSubmitHandler = function (event) {
    event.preventDefault();
    
    var city = cityInputEl.value.trim();

    if (city) {
      //get weather via API if searched term is valid
      getCityWeather(city);
      console.log(city);
      
    } else {
      //if user does not enter a correct city, or no city
      alert('Invalid - Please enter a city name')
    }
  };

  //functions

  // function to take user input of city name and search it through the open weather API
    //a - if incorrect city, display error message
    //b - if correct city, pull data for city

  //function to display weather for searched city into a container of info for city's weather on CURRENT DAY
  
  //function to display 5 day forecast in container for 5 day forecast

//function to dynamically color the UV index depending on if conditions are favorable, moderate, or severe

  // function to save previously searched cities in local storage which then shows current and forecast for these cities
