//two APIs I need to fetch- first current weather API gets latitude and longitude of city searched get lat and long 
// place into second API called one call

var myApiKey= "079955fb255c3ebb2910b2b976633cea";
var cities= [];
var citySearchEl= document.getElementById("PlaceCityHere")
var searchBtnEl= document.getElementById("searchBtn")
var clearBtn=document.getElementById("clearSearchHistory");
var CurrentWeatherIcon= document.getElementById("WeatherIconCurrent") 
var cityNameEl= document.getElementById("CityName")
var TempEl= document.getElementById("temp")
var HumidityEl= document.getElementById("humidity")
var UvEl= document.getElementById("UV-index")
var windEl= document.getElementById("wind-speed")
var historyEl= document.getElementById("SearchHistory")
var FiveDayHeaderEl= document.getElementById("5DayForecastHeader")
var CurrentWeatherEl= document.getElementById("CurrentDaysWeather")
var LocalStorageHistory= JSON.parse(localStorage.getItem("search")) || [];
var presentCity; 


var formSubmitControl= function(event){
  event.preventDefault(); 
  var city=cityNameEl.value.trim();
  if(city){
    DocCityWeather(city);
    Doc5DayWeather(city);
    cities.unshift({city});
    cityNameEl.value= "";
  }
  else{
    alert("Please Enter A City");
  }
  savedSearches() 
  searchHistory()

}

















function dailyWeather() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat="+lat&lon=-94.04&exclude=hourly,minutely,alerts&units=imperial&appid=${myApiKey}`
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
       
       
       
       
      })
  }
dailyWeather() 
searchBtnEl.addEventListener('click', dailyWeather); 


