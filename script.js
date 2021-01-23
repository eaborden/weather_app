var city = "";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidity = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");

function find(c) {
    for (var i = 0; i < searchCity.length; i++) {
        if (c.toUpperCase() === sCity[i]) {
            return -1;
        }
    }
    return 1;
}

//comment this out
var APIKey = "d5681f3131e574c0d003aab2036f2d50";
function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var weathericon = response.weather[0].icon;
        var iconurl = "https://openweather.org/img/wn/" + weathericon + "@2x.png";

    })
}
// from https://www.epochconverter.com/programming/#javascript

var date = new Date(response.dt*1000).toLocaleDateString();
$(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");

var tempF = (response.main.temp * 9 / 5 + 32);
$(currentTemperature).html((tempF).toFixed(2) + "&#8457");

$(currentHumidity).html(response.main.humidity + "%");

var ws = response.wind.speed;
var windsmph = (ws * 2.237).toFixed(1);
$(currentWSpeed).html(windsmph + "mph");

currentUvindex(response.coord.lon, response.coord.lat);
forecast(response.id);
if (response.cod == 200) {
    sCity = JSON.parse(localStorage.getItem("cityname"));
    console.log(sCity);
    if (sCity == null) {
        sCity = [];
        sCity.push(city.toUpperCase());
        localStorage.setItem("cityname", JSON.stringify(sCity));
        addToList(city);
    }
    else {
        if (find(city) > 0) {
            sCity.push(city.toUpperCase());
            localStorage.setItem("cityname", JSON.stringify(sCity));
            addToList(city);
        }
    }
}

function Uvindex(ln, lt) {
    var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;
    //var uvqURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
    $.ajax({
        url: uvqURL,
        method: "GET"
    }).then(function (response) {
        $(currentUvindex).html(response.value);
    });
}
function forecast(cityid) {
    var dayover = false
    var queryforcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;

    $.ajax({
        url: queryforcastURL,
        method: "GET"
    }).then(function (response) {

        for (i = 0; i < 5; i++) {
            var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempK = response.list[((i + 8) * 8) - 1].main.temp;
            var tempF = (((tempK - 273.5) * 1.8) + 32).toFixed(2);
            var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

            $("#fDate" + i).html(date);
            $("#fImg" + i).html("<img src=" + iconurl + ">");
            $("FTemp" + i).html(tempF + "&#8457");
            $("fHumidity" + i).html(humidity + "%");
        }
    });
}

function addToList(C) {
    var listEl = $("<li>" + c.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}

function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = LiEl.textContent.trim();
        currentWeather(city);
    }

    function loadlastcity() {
        $("ul").empty();
        var sCity = JSON.parse(localStorage.getItem("cityname"));
        if (sCity !== null) {
            sCity = JSON.parse(localStorage.getItem("cityname"));
            for (i = 0; i < sCity.length; i++) {
                addToList(sCity[i]);
            }
            city = sCity[i - 1];
            currentWeather(city);
        }
    }

    function clearHistory(event) {
        event.preventDefault();
        sCity = [];
        localStorage.removeItem("cityname");
        document.location.reload();
    }
}

$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastcity);
$("#clear-history").on("click", clearHistory);


        // var submitTheForm = function(event) {
//     event.preventDefault();
//     var city = city.val().trim();
//     if(city) {
//         getCityWeather(city);
//         cities.unshift({city});
//         cityInput.value = ("");
//     } else {
//         alert("please enter a city")
//     }
// }

// var getCityWeather = function(city) {
// //var apiKey = "d5681f3131e574c0d003aab2036f2d50"
// var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d5681f3131e574c0d003aab2036f2d50"
// fetch(apiURL)
// .then(function(response){
//     response.json().then(function(data){
//         displayWeather(data, city);
//     });
// })

// var displayWeather = function(weather, searchCity) {
// currentWeatherContainer.textContent=("");
// searchCityInput.textContent=searchCity;
// //console.log(weather)
// var temperatureData = document.createElement("span");
// temperatureData.textContent = "Temperature: " + weather.main.temp + "*F";
// temperatureData.classList = "list-group-item";

// currentWeatherContainer.appendChild(temperatureData)

// }

// }
// selectedCityForm.addEventListener("submit", submitTheForm);


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast