



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

