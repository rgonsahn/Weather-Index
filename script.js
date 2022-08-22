//two APIs I need to fetch- first current weather API gets latitude and longitude of city searched get lat and long 
// place into second API called one call

var myApiKey = "079955fb255c3ebb2910b2b976633cea";
// var cities= [];
var citySearchEl = $("#PlaceCityHere")
var searchBtnEl = document.getElementById("searchBtn")
var clearBtn = document.getElementById("clearSearchHistory");
var CurrentWeatherIcon = document.getElementById("WeatherIconCurrent")
var cityNameEl = document.getElementById("CityName")
var TempEl = document.getElementById("temp")
var HumidityEl = document.getElementById("humidity")
var UvEl = document.getElementById("UV-index")
var windEl = document.getElementById("wind-speed")
var historyEl = document.getElementById("SearchHistory")
var FiveDayHeaderEl = document.getElementById("5DayForecastHeader")
var CurrentWeatherEl = $("#CurrentDaysWeather")
var CurrentWeatherConditions = document.getElementById("CurrentConditions")
var State = document.getElementById("stateName")
// var LocalStorageHistory= JSON.parse(localStorage.getItem("search")) || [];
// var presentCity; 

// "45ebbd33aab5c77a18994061b0a6ee6a"
// var formSubmitControl= function(event){
//   event.preventDefault(); 
//   var city=citySearchEl.value.trim();
//   if(city){
//     // DocCityWeather(city);
//     // Doc5DayWeather(city);
//     cities.unshift({city});
//     citySearchEl.value= "";
//   }
//   else{
//     alert("Please Enter A City");
//   }
//   // savedSearches() 
//   // searchHistory()

// } 
// var searchHistory = function () {
//   localStorage.setItem("cities", JSON.stringify(cities));
// };

// var localWeather = function (city) {
//   var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=Atlanta&units=imperial&appid=${myApiKey}`
//   fetch(apiUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//     })



// }
function GetLatLon(city) {
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myApiKey}`
  fetch(geoUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      const HtwoEl = document.createElement("h2")
      HtwoEl.textContent = data[0].name
      cityNameEl.appendChild(HtwoEl)
      dailyWeather(data[0].lat, data[0].lon)
      const CurrentState = document.createElement("p")
      CurrentState.textContent = data[0].state
      State.appendChild(CurrentState) 
      const currentDate = document.createElement("p")
      currentDate.textContent = data.current.dt
      CurrentWeatherConditions.appendChild(currentDate)


      // inner text grabs data from API
    })


}






// localWeather()












// console.log(Objectresponse.message.body.lyrics.lyrics_body
//   )
//     lyricstext.textContent=Objectresponse.message.body.lyrics.lyrics_body









function dailyWeather(lat, lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${myApiKey}`

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data)


    })
}
// dailyWeather() 
searchBtnEl.addEventListener('click', function (event) {
  var cityName = citySearchEl.val().trim()
  GetLatLon(cityName)

});


