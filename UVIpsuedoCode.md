In order to get the UV index we have to use the Ultraviolet Index API(UI)
* http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

The UI API does not have the city as a parameter.  To get the location the latitude, longitude (lat, lon) parameter has to be used for the location.  Because the city is being searched for in the current weather query, there need to be a way to bridge between the UV API and the current weather API.  The current weather API also has lat, lon parameter.  Therefore the following steps need to occur to incorporate the UV index into the current weather:
1.  Get the lat, lon parameters ferom the current weather API.  Assign them to variable.
2.  Put the current weather lat, lon variables into the UV API call.  This will get the UV index for the same location as the current weather API city.