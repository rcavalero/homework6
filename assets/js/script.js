// Instructions
// Build a weather dashboard application with search functionality to find current weather 
// conditions and the future weather outlook for multiple cities. 

// Use the OpenWeather API to retrieve weather data for cities. 
// The documentation includes a section called "How to start" that will provide basic setup and usage instructions.

// Your app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.


// Application loads last searched city forecast on page load.


// need to add an eventlistener to the search button that will populate the search string with the city name

  // Display the following under current weather conditions:
      // City
      // Date
      // Icon image (visual representation of weather conditions)
      // Temperature
      // Humidity
      // Wind speed
      // UV index

  // Include a 5-Day Forecast below the current weather conditions. Each day for the 
    // 5-Day Forecast should display the following:
        // Date
        // Icon image (visual representation of weather conditions)
        // Temperature
        // Humidity

      // add the city searched to the list of previous searches
    // Store the city in local storage
    // these will need to act like buttons so when they are selected the value goes back into the 
      // search field and "clicks" the search button


// *** Hints ***
    // Create multiple functions within your application to handle the different parts of the dashboard:
        // Current conditions
        // 5-Day Forecast
        // Search history
        // UV index

// Application uses icons to represent weather conditions.

// You will need to make more than one AJAX call.

// You will need to hardcode some of the parameters in the API's URL. 
// User input will determine some of the other parameters.

// Use localStorage to store any persistent data.
    // cities searched

// **** Minimum Requirements ***
    // Functional, deployed application.
    // GitHub repository with a unique name and a README describing the project. (rename repository)
    // User can search for weather reports by city using the openweathermap API.
    // After searching for a city, the following information is displayed:
        // Current temperature
        // Current humidity
        // Windspeed
        // Uv index
        // 5 day forecast

// ****  BONUS  ****
    // Use the Geolocation API to add the user's current location to the initial landing page.
    // Add the application to your portfolio.

  // This is our API key - update this to my API Key
  // var APIKey = "166a433c57516f51dfab1f7edaed8413";

// add document ready
  var apiKey = "abe3fd78d43eae49a7a10d2d9c80722e"; 

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    // var cityToSearch = $("#search").val(); 
    var cityToSearch = "seattle"; 
    getCurrWeather(cityToSearch);
    getCurrForecast(cityToSearch);
  });

  // Here we run our AJAX call to the OpenWeatherMap API for current weather info
  function getCurrWeather(location) {
    var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+location+"&units=imperial&appid=" + apiKey;
 
  $.ajax({
    url: queryWeatherURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

      console.log(response);

    // Need the following variables for the current conditions
  var currCity = response.name;
  // var currDate = response.dt;  // this will need to be converted
  // console.log(currDate);

  var currDate = moment().format("(MM/DD/YYYY)"); 
  var currTemp = response.main.temp;
  var currHumid = response.main.humidity;
  var currWind = response.wind.speed;
  var currIcon = response.weather[0].icon;
  var currConditionsUrl = "http://openweathermap.org/img/wn/"+currIcon+"@2x.png"
  var currUV = "";
  // console.log("city: "+currCity);
  // console.log("date: "+currDate);
  // console.log("temp: "+currTemp);
  // console.log("humidity: "+currHumid);
  // console.log("wind: "+currWind);
  // console.log("icon: "+currIcon);
  // console.log("url "+currConditionsUrl);
  
  var cityDate = currCity+" "+currDate;
  $("#searchedCity").text(cityDate);

  $("#currCondIcon").attr("src", currConditionsUrl);
      // var cityDate = $("<p>").text();
  // $("#searchedCity").text(currCity+" "+formattedDate+" ");
  // searchCity.append(icon);

  $("#currTemp").text("Temperature: "+currTemp+" 0 F");
  $("#currHumid").text("Humidity: "+currHumid+"%");
  $("#currWind").text("Wind: "+currWind+" MPH");
  // $("#currTemp").text("Temperature: "+currTemp+" 0 F");
  
    
    })
  };
  function getCurrForecast(location) {
  
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?" +
    "q="+location+"&units=imperial&appid=" + apiKey;
    

    $.ajax({
    url: queryForecastURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      console.log(response);

      var currDate = moment().format("(MM/DD/YYYY)"); 


      for (let i = 0; i < 5; i++) {

      var days = ["4","12","20","28","32"];
      // day = days[i];

      var forecastDate = moment().add((i+1), 'days').format("MM/DD/YYYY");

      var forecastTemp = response.list[days[i]].main.temp;
      var forecastHumid = response.list[days[i]].main.humidity;
      var forecastIcon = response.list[days[i]].weather[0].icon;
      var forecastConditionsUrl = "http://openweathermap.org/img/wn/"+forecastIcon+"@2x.png"

      var date = $("<p>");
      var temp =  $("<p>");
      var humidity = $("<p>")
      var icon = $("<img>")
        
        date.text(forecastDate);
        temp.text("Temp: "+forecastTemp+" F");
        humidity.text("Humidity: "+forecastHumid+"%");
        icon.attr("src", forecastConditionsUrl);

        $("#forecast"+(i+1)).append(date, icon, temp, humidity);
  
    };
          
   
    })
  };