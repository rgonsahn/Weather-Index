//two APIs I need to fetch- first current weather API gets latitude and longitude of city searched get lat and long 
// place into second API called one call
var myApiKey= "079955fb255c3ebb2910b2b976633cea";
var citySearchEl=$(`#input1`);
var searchBtnEl=$(`#searchBtn`);
var clearBtn=$('#clearBtn'); 

var presentCity; 

function pullWeather(data){
    var requestUrl= `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={myApiKey}`
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    }
    )
}

function getApi() {
    // replace `octocat` with anyone else's GitHub username
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${myApiKey}`
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
