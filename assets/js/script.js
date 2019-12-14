
// *** functionality todos ***
// how to handle invalid city names
// change behavior when user presses enter after entering name
  // name disappears and nothing happens
// UV info into forecast data
// degree symbol in temps

//  *** Formatting Items ***
// make icon small in current weather

// *** other to-dos ***
// rename repository

// ****  BONUS  ****
    // Use the Geolocation API to add the user's current location to the initial landing page.
    // Add the application to your portfolio.


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

      cityLat = response.coord.lat;
      cityLon = response.coord.lon;
      getUvInfo(cityLat,cityLon);
    

  var currCity = response.name;

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
      // var forecastConditionsUrl = "http://openweathermap.org/img/wn/"+forecastIcon+`@2x.png" width="50" height="50"`;

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
    var prevSearch = $(`<button type="button" class="btn btn-block btn-outline-secondary prevSearchBtn mt-0">`);
    prevSearch.attr("id", "prevSearchBtn"+index);
    prevSearch.attr("data-index", index);
    prevSearch.text(cityName);

    $("#searchedCities").append(prevSearch);   
  });
};

// $("#searchedCities").on("click", function(event){
  $("#prevSearched").on("click", function(event){
    var target = $(event.target);
  // console.log(target);
  
    event.preventDefault();
  
  var selectedBtn = target.attr("data-index");

  var selectedCity = weather[selectedBtn];

  getCurrWeather(selectedCity);
  getForecastWeather(selectedCity);
  weather.splice(selectedBtn,1)
  weather.unshift(selectedCity);
  renderCitiesSearched();

});


});