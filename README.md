# Weather Dashboard

Create a weather dashboard that will tell a traveler what the current conditions are, future condition will be, and the ability to enter multiple cities to recall when needed.

## GitHub Repository

https://github.com/eaborden/weather_app

## Deployed Application


## Table of Contents
[Required Elements](#required-elements)\
[Requirements](#requirements)\
[Future Development](#future-development)\
[Project Images](#project-images)

## Required Elements
[OpenWeather API](https://openweathermap.org/api)
*   [Current Weather Data](https://openweathermap.org/current)
*   [UV Index](https://openweathermap.org/api/uvi)
*   [Daily Forecast 16 days](https://openweathermap.org/forecast16)

index.html\
style.css\
index.js\

# Requirements

Weather dashboard with form inputs:

Search for a city
*   Presented with current and future conditions for that city and that city is added to the search history

View current weather conditions for that city
*   Presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

View the UV index
*   Presented with a color that indicates whether the conditions are favorable, moderate, or severe

View future weather conditions for that city
*   Presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

Click on a city in the search history
*   Presented with current and future conditions for that city

I re-open the weather dashboard
*   Presented with the last searched city forecast

## Future Development
* Incorporate the UV index datapoint (see UVIpsuedoCode.md)
* Use the imperial setting in the current weather API to avoid having to do the calculation on temperature.
* Because is searching by city, and not using State, it is random with City you are getting (i.e. Denver, CO or Denver, PA).  Incorporate State into the query to be more accurate.

## Project Images

###  Application Screenshot

