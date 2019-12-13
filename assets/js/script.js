// Instructions
// Build a weather dashboard application with search functionality to find current weather 
// conditions and the future weather outlook for multiple cities. 

// Use the OpenWeather API to retrieve weather data for cities. 
// The documentation includes a section called "How to start" that will provide basic setup and usage instructions.

  // Display the following under current weather conditions:
      // UV index


// *** Hints ***
    // Create multiple functions within your application to handle the different parts of the dashboard:
        // UV index



// You will need to hardcode some of the parameters in the API's URL. 
// User input will determine some of the other parameters.
// should the search be limited to the US?

// *** functionality todos ***
// how to handle invalid city names
// why doesn't button work second time?
//  UV info into forecast data
//  degree symbol in temps

//  *** Formatting Items ***
// make icon small in current weather
// add degree icon to temp
// fix search & button 
// put border around second column
// remove/update colors
// fix previous search buttons
// are headings the right size?

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

$(document).ready(function(){
  var apiKey = "abe3fd78d43eae49a7a10d2d9c80722e"; 
  var cityLat = 0;
  var cityLon = 0;
  var currUvIndex = 0;
  var forecastIndex0 = 0;
  var forecastIndex1 = 0;
  var forecastIndex2 = 0;
  var forecastIndex3 = 0;
  var forecastIndex4 = 0;

  var weather = JSON.parse(localStorage.getItem("weather") || "[]");

  var lastSearch = weather[0];
  getCurrWeather(lastSearch);
  getForecastWeather(lastSearch); 
  renderCitiesSearched();


$("#searchBtn").on("click", function(event){
    event.preventDefault();

    var cityToSearch = $("#search").val(); 
    if (!cityToSearch) {
      return;
    }
    weather.unshift(cityToSearch);
    localStorage.setItem("weather", JSON.stringify(weather));

    getCurrWeather(cityToSearch);
    getUvInfo(cityLat,cityLon);
    getForecastWeather(cityToSearch);
    renderCitiesSearched();
    $("#search").val("");
    

  });

  function getCurrWeather(location) {
    var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+location+"&units=imperial&appid=" + apiKey;
 
  $.ajax({
    url: queryWeatherURL,
    method: "GET"
  })
    .then(function(response) {

      // console.log(response);

      cityLat = response.coord.lat;
      cityLon = response.coord.lon;
      getUvInfo(cityLat,cityLon);
    

  var currCity = response.name;
  // if (!currCity){
  //   return;
  // }

  var currDate = moment().format("(MM/DD/YYYY)"); 
  var currTemp = response.main.temp;
  var currHumid = response.main.humidity;
  var currWind = response.wind.speed;
  var currIcon = response.weather[0].icon;
  var currConditionsUrl = "http://openweathermap.org/img/wn/"+currIcon+"@2x.png"
  var currUV = "";
  
  var cityDate = currCity+" "+currDate;
  $("#searchedCity").text(cityDate);

  $("#currCondIcon").attr("src", currConditionsUrl);

  $("#currTemp").text("Temperature: "+currTemp+" F");
  $("#currHumid").text("Humidity: "+currHumid+"%");
  $("#currWind").text("Wind: "+currWind+" MPH");
  
    
    })
  };

  function getUvInfo(lat,lon) {
    var queryUvInfoURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid="+apiKey+"&lat="+cityLat+"&lon="+cityLon
 
  $.ajax({
    url: queryUvInfoURL,
    method: "GET"
  })
    .then(function(response) {

      // console.log(response);

  currUvIndex = response[0].value;
  forecastIndex0 = response[1].value;
  forecastIndex1 = response[2].value;
  forecastIndex2 = response[3].value;
  forecastIndex3 = response[4].value;
  forecastIndex4 = response[5].value;
  // console.log("ind4 "+forecastIndex4);
  
  $("#currUV").text("UV Index: "+currUvIndex);
    
    })
  };

  

  function getForecastWeather(location) {
  
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?" +
    "q="+location+"&units=imperial&appid=" + apiKey;

    $.ajax({
    url: queryForecastURL,
    method: "GET"
  })
    .then(function(response) {
      // console.log(response);
      $(".forecastInfo").html("");

      var currDate = moment().format("(MM/DD/YYYY)"); 
      for (let i = 0; i < 5; i++) {

      var days = ["0","8","12","20","28"];
      
      var forecastDate = moment().add((i+1), 'days').format("MM/DD/YYYY");

      var forecastTemp = response.list[days[i]].main.temp;
      var forecastHumid = response.list[days[i]].main.humidity;
      var forecastIcon = response.list[days[i]].weather[0].icon;
      var forecastConditionsUrl = "http://openweathermap.org/img/wn/"+forecastIcon+"@2x.png";

      var date = $("<p>");
      var icon = $("<img>");
      var temp =  $("<p>");
      var humidity = $("<p>");
      var uvIndex = $("<p>");        
        date.text(forecastDate);
        temp.text("Temp: "+forecastTemp+" F");
        humidity.text("Humidity: "+forecastHumid+"%");
        icon.attr("src", forecastConditionsUrl);

        $("#forecast"+(i+1)).append(date, icon, temp, humidity);
    };
  });
};

function renderCitiesSearched(){
  $("#searchedCities").html("");

  weather.forEach(function(city, index) {

    var cityName = weather[index];
    var prevSearch = $(`<button type="button" class="prevSearchBtn w-100">`);
    prevSearch.attr("id", "prevSearchBtn"+index);
    prevSearch.attr("data-index", index);
    prevSearch.text(cityName);

    $("#searchedCities").append(prevSearch);   
  });
};

$(".prevSearchBtn").on("click", function(event){
  event.preventDefault();
  console.log(this);
  
  var selectedBtn = $(this).attr("data-index");

  var selectedCity = weather[selectedBtn];

  getCurrWeather(selectedCity);
  getForecastWeather(selectedCity);
  weather.splice(selectedBtn,1)
  weather.unshift(selectedCity);
  renderCitiesSearched();

});


});