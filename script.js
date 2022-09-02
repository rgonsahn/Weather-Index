//two APIs I need to fetch- first current weather API gets latitude and longitude of city searched get lat and long 
// place into second API called one call

var myApiKey = "079955fb255c3ebb2910b2b976633cea";
var citySearchEl = $("#PlaceCityHere")
var searchBtnEl = document.getElementById("searchBtn")
var clearBtn = document.getElementById("clearSearchHistory");
var CurrentWeatherIcon = document.getElementById("WeatherIconCurrent")
var cityNameEl = document.getElementById("CityName")
var TempEl = document.getElementById("temp")
var HumidityEl = document.getElementById("humidity")
var UvEl = document.getElementById("UV-index")
var windEl = document.querySelector("wind-speed")
var FiveDayHeaderEl = document.getElementById("5DayForecastHeader")
// var CurrentWeatherEl = $("#CurrentDaysWeather")
var currentWeatherConditions = document.getElementById("CurrentDaysWeather")
var pastCityBtn = document.createElement("button");
var addToSearch = JSON.parse(localStorage.getItem("city")) || []
// var historyList = GetSearchHistory()
localStorage.setItem("city", JSON.stringify(addToSearch));
console.log(addToSearch)

function GetLatLon(city) {
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myApiKey}`
    fetch(geoUrl)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var name = data[0].name
        var state = data[0].state
        dailyWeather(data[0].lat, data[0].lon, name, state)
      })
}
function dailyWeather(lat, lon, city, state) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&limit=5&appid=${myApiKey}`
    fetch(requestUrl)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        const HtwoEl = document.getElementById("cityName") 
        console.log(HtwoEl)
        var imageIcon = document.createElement("img");
        var iconUrl = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
        imageIcon.setAttribute("src", iconUrl)
        HtwoEl.textContent = city
        HtwoEl.appendChild(imageIcon)
        var currentDate = document.getElementById("date")
        var momentDate = moment(data.dt).format('MMMM Do YYYY')
        currentDate.textContent = momentDate
        // currentWeatherConditions.append(currentDate)
        console.log(momentDate, currentDate)
        const CurrentState = document.getElementById("stateName")
        CurrentState.textContent = state
        var TempEl = document.getElementById("temp")
        var currentTemp = (data.current.temp) + "°F";
        TempEl.textContent = currentTemp;
        var temperature = currentTemp;
        $('#temp').html(
          '<b>Current Temperature:</b>' + '<span class="badge-pill badge-light" id="temp">' + temperature + '</span>'
        )
        var windEl = document.getElementById("wind-speed")
        var currentWind = (data.current.wind_speed) + "%"
        windEl.textContent = currentWind
        var wind = currentWind
        $('#wind-speed').html(
          '<b>Wind Speed:</b>' + '<span class="badge-pill badge-light" id="wind-speed">' + currentWind + '</span>'
        )
        var HumidityEl = document.getElementById("humidity")
        var currentHumidity = (data.current.humidity) + "%"
        HumidityEl.textContent = currentHumidity
        var humid = currentHumidity;
        $('#humidity').html(
          '<b>Humidity:</b>' + '<span class="badge-pill badge-light" id="humidity">' + humid + '</span>'
        )
        var UvEl = document.getElementById("UV-index")
        var currentUvi = (data.current.uvi)
        UvEl.textContent = currentUvi
        var uviColor = currentUvi;
        var uvI = currentUvi;
        $('#UV-index').html(

          '<b>UV Index:</b>' + '<span class="badge-pill badge-light" id="UV-index">' + uvI + '</span>'
        )
        if (uvI < 3) {
          $('#UV-index').css('background-color', 'green');
        } else if (uvI < 6) {
          $('#UV-index').css('background-color', 'yellow');
        }
        else if (uvI < 8) {
          $('#UV-index').css('background-color', 'orange');
        }
        else if (uvI < 11) {
          $('#UV-index').css('background-color', 'red');
        } else {
          $('#UV-index').css('background-color', 'purple');
        }
        document.getElementById("fiveDay").innerHTML = ""
        for (var i = 0; i < 5; i++) {
          var dailyMomentDt = moment.unix(data.daily[i].dt).format("L");
          var colDiv = document.createElement("div")
          colDiv.setAttribute("class", "col-lg-2 forecast bg-primary m-2 rounded")
          var cardDiv = document.createElement("div")
          cardDiv.setAttribute("class", "card")
          colDiv.appendChild(cardDiv)
          var dailyDate = document.createElement("p")
          dailyDate.textContent = dailyMomentDt
          cardDiv.appendChild(dailyDate)
          var dailyIcon = document.createElement("img");
          var imgUrl = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
          dailyIcon.setAttribute("src", imgUrl)
          cardDiv.append(dailyIcon)
          var temp5Day = document.createElement("p")
          var daily5Day = "Temperature:" + data.daily[i].temp.day + "°F";
          temp5Day.textContent = daily5Day
          cardDiv.appendChild(temp5Day)
          var wind5Day = document.createElement("p")
          var dailyWind = "Wind-Speed:" + data.daily[i].wind_speed + "%";
          wind5Day.textContent = dailyWind
          cardDiv.appendChild(wind5Day)
          var humidity5Day = document.createElement("p")
          var dailyhumid = "Humidity:" + data.daily[i].humidity + "%"
          humidity5Day.textContent = dailyhumid
          cardDiv.appendChild(humidity5Day)
          document.getElementById("fiveDay").appendChild(colDiv)
        }
      })
}
// dailyWeather()
searchBtnEl.addEventListener('click', function (event) {
  var cityName = citySearchEl.val().trim()
  GetLatLon(cityName)
  
  //Get search history and store in array
  var storedHistory = JSON.parse(localStorage.getItem('city'));
  //Add city to array and append to array
  storedHistory.push(cityName);
  //store item in localstorege
  localStorage.setItem("city", JSON.stringify(storedHistory));
});
function addSearchHistory(yourSearchHistory) {
  var addToSearch = JSON.parse(localStorage.getItem("city")) || []
  var historySearchesEl = document.getElementById('history');
  historySearchesEl.innerHTML = '';
  if (addToSearch.includes(yourSearchHistory) === false) {
    addToSearch.push(yourSearchHistory)
    // localStorage.setItem("city", JSON.stringify(addToSearch));
  };

  for (i = 0; i < addToSearch.length; i++) {
    var pastCityBtn = document.createElement("button");
    pastCityBtn.classList.add("btn", "btn-warning", "my-2" ,"past-city");
    pastCityBtn.setAttribute("style", "width: 100%");
    pastCityBtn.textContent =`${addToSearch[i]}`;
    historySearchesEl.appendChild(pastCityBtn);
  }

}

for (var i = 0; i < addToSearch.length; i++) {
  addSearchHistory(addToSearch[i]);
  console.log(addToSearch[0])
  console.log(addSearchHistory)
} 

function clearSearchHistory(event){
  event.preventDefault()
  var historySearchesEl = document.getElementById('history');
localStorage.removeItem('city');
historySearchesEl.innerHTML='';
return;
}

// function clearHistory (){
//   currentWeatherConditions.innerHTML='';
//   fiveDayHeaderEl.innerHTML='';
//   cardDiv.innerHTML='';
//   return;

// }

// function submitForm(event){
//   event.preventDefault();
//   cityName; 
//   clearHistory()
//   return;

// }

function restoreSearch (event) {
  var cityEl= event.target; 
  if(cityEl.matches(".past-city")){
    cityName=cityEl.textContent;
    GetLatLon(city)
  }

}

clearBtn.addEventListener('click',clearSearchHistory);
pastCityBtn.addEventListener('click',function(event){
  var addSearch = addToSearch[0].val().trim()
  GetLatLon(event)
  
var storedHistory = JSON.parse(localStorage.getItem('city'));
  //Add city to array and append to array
  storedHistory.push(addSearch);
  //store item in localstorege
  localStorage.setItem("city", JSON.stringify(storedHistory));

});
