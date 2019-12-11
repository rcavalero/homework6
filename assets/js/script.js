console.log("linked");

// Instructions
// Build a weather dashboard application with search functionality to find current weather 
// conditions and the future weather outlook for multiple cities. 

// Use the OpenWeather API to retrieve weather data for cities. 
// The documentation includes a section called "How to start" that will provide basic setup and usage instructions.

// Use AJAX to hook into the API to retrieve data in JSON format.

// Your app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.
// Application loads last searched city forecast on page load.

// Display the following under current weather conditions:
    // City
    // Date
    // Icon image (visual representation of weather conditions)
    // Temperature
    // Humidity
    // Wind speed
    // UV index


// Include a search history so that users can access their past search terms. 
// Clicking on the city name should perform a new search that returns current and future conditions for that city.

// Include a 5-Day Forecast below the current weather conditions. Each day for the 
// 5-Day Forecast should display the following:
    // Date
    // Icon image (visual representation of weather conditions)
    // Temperature
    // Humidity

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
    // GitHub repository with a unique name and a README describing the project.
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

  // This is our API key
  // var APIKey = "166a433c57516f51dfab1f7edaed8413";

  // Here we are building the URL we need to query the database
  // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    // "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // })
    // We store all of the retrieved data inside of an object called "response"
    // .then(function(response) {

      // Log the queryURL
      // console.log(queryURL);

      // Log the resulting object
      // console.log(response);

      // Transfer content to HTML
      // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      // $(".wind").text("Wind Speed: " + response.wind.speed);
      // $(".humidity").text("Humidity: " + response.main.humidity);
      // $(".temp").text("Temperature (F) " + response.main.temp);

      // Converts the temp to Kelvin with the below formula
      // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      // $(".tempF").text("Temperature (Kelvin) " + tempF);

      // Log the data in the console as well
      // console.log("Wind Speed: " + response.wind.speed);
      // console.log("Humidity: " + response.main.humidity);
      // console.log("Temperature (F): " + response.main.temp);
    // });
