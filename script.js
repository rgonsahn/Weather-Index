//two APIs I need to fetch- first current weather API gets latitude and longitude of city searched get lat and long 
// place into second API called one call
var myApiKey= "079955fb255c3ebb2910b2b976633cea";
var citySearchEl=$(`#citySearch`);
var searchBtnEl=$(`#searchBtn`);
var clearBtn=$('#clearBtn'); 

var presentCity; 

function dailyWeather() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&units=imperial&appid=${myApiKey}`
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)

        for (var i = 1; i < 6; i++) {
            console.log(data.daily[i])
            // add to html
        }
      });
  }
dailyWeather()