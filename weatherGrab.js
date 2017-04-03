var inquirer = require("inquirer");
var locationGrab = require('./locationGrab.js')();
var weather = require("weather-js");
var fs = require('fs');


module.exports = function() { 

	this.getWeather_location = function(callBack) {

		inquirer.prompt([
			{
			    type: "input",
			    message: "\nPlease Enter your Location:",
			    name: "user_location"
			}
		]).then(function(userResults) {
			var quickLocation = getLocation(userResults.user_location, function(address_formatted){
				getWeather(address_formatted, callBack, userResults.user_location);
			});
		});

	}

	this.getWeather = function(location, callBack, unformatted_Address) {
		weather.find({ search: location, degreeType: "F" }, function(err, result) {

			// if (err) {
			// 	console.log(err);
			// }

			var d = new Date();

			var returned_weather = result;

			if(returned_weather[0] != null){
				var newWeather = new Weather_OBJ(
					location, 
					returned_weather[0].current.temperature, 
					returned_weather[0].current.skytext, 
					returned_weather[0].forecast[1].low,
					returned_weather[0].forecast[1].high
				);

				var outputText =
					"\n________________________________\nSTART OF WEATHER FORECAST\n"+ d +"\n\n"

					+location + "\n"
				 	
				 	+"Current Temperature: " + returned_weather[0].current.temperature + " F\n"
				 	
				 	+"Sky: " + returned_weather[0].current.skytext + "\n"
					
					+"Tomorrow's Forecast: Low of " + returned_weather[0].forecast[1].low 
					+ "F, High of " + returned_weather[0].forecast[1].high + "F\n"

					+"\nEND OF WEATHER FORECAST\n"+ d +"\n"+"________________________________\n";

				;
				console.log(outputText);
				fs.appendFile('log.txt', (outputText+"\n") );
				callBack();
			}else{
				console.log(
					"\n\nYour Search: "
					+unformatted_Address
					+ "\nDid Not Return Weather Data,\nPlease Try Again.\n"
				);
				callBack();
			}

		});
	}
}

//weather obj constructor
function Weather_OBJ(location, currentTemp, sky, forecast_Low, forecast_High) {
	this.location = location;
	this.currentTemp = currentTemp;
	this.sky = sky;
	this.forecast_Low = forecast_Low;
	this.forecast_High = forecast_High;
}
