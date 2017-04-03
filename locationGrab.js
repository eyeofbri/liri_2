var geocoder = require('geocoder');

module.exports = function() { 
	this.getLocation = function(rawLocation, callBack) {
		geocoder.geocode( rawLocation, function ( err, data ) {
			var locationResults = data.results[0].formatted_address;
			return callBack(locationResults);
		});
	}
}