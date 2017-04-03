var inquirer = require("inquirer");
var fs = require('fs');
var request = require('request');

module.exports = function() {
	this.OMDB_Search = function(callBack) {
		inquirer.prompt([
			{
		    	type: "input",
		   		message: "\nPlease Enter A Movie Title:",
		  		name: "query"
			}
		]).then(function(results) {
			
		 	var movieName = results.query;
			if(!movieName){ 
				console.log("\nNo Movie Entered,\nSearching OMDB For: Mr. Nobody");
				movieName = "Mr. Nobody"; 
			}else{
				console.log("\nSearching Spotify For: "+movieName);
			}

			var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

			request(queryURL, function (error, response, body) {
			  logMovies(body, callBack);
			});
			
		});
	}
	this.OMDB_withMovie = function(movieName, callBack) {

		if(!movieName){ 
			console.log("\nNo Movie Entered,\nSearching OMDB For: Mr. Nobody");
			movieName = "Mr. Nobody"; 
		}else{
			console.log("\nSearching Spotify For: "+movieName);
		}

		var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

		request(queryURL, function (error, response, body) {
		  logMovies(body, callBack);
		});
		
	}
}


function logMovies(body, callBack) {

	//HEY!!!!!!!!!!!!!!!
	//YOU COULD ALSO USE JSON.parse(body).imdbRating;
	// insteasd of the split grabs

	//Hello old brian, this is slighty more contemporary brian...
	//... I agree that I should use the parse, but I will totally do it...later.

	

	// // * Title of the movie.
	var mTitle = body.split("Title")[1].split("Year")[0];
	mTitle = "Movie Title: "+mTitle.substring(3,mTitle.length - 3);

	// // * Year the movie came out.
	var mYear = body.split("Year")[1].split("Rated")[0];
	mYear = "Year: "+mYear.substring(3,mYear.length - 3);

	// // * IMDB Rating of the movie.
	var mRating = body.split("Rated")[1].split("Released")[0];
	mRating = "Rated: "+mRating.substring(3,mRating.length - 3);

	// // * Country where the movie was produced.
	var mCountry = body.split("Country")[1].split("Awards")[0];
	mCountry = "Produced In: "+mCountry.substring(3,mCountry.length - 3);

	// // * Language of the movie.
	var mLanguage = body.split("Language")[1].split("Country")[0];
	mLanguage = "Language: "+mLanguage.substring(3,mLanguage.length - 3);

	// // * Plot of the movie.
	var mPlot = body.split("Plot")[1].split("Language")[0];
	mPlot = "Plot: "+mPlot.substring(3,mPlot.length - 3);

	// // * Actors in the movie.
	var mActors = body.split("Actors")[1].split("Plot")[0];
	mActors = "Actors: "+mActors.substring(3,mActors.length - 3);

	// // * Rotten Tomatoes Rating.
	var mRotten_Rating = body.split("tomatoRating")[1].split("tomatoReviews")[0];
	mRotten_Rating = mRotten_Rating.substring(3,mRotten_Rating.length - 3);

	//if there are no rotten tomato ratings...
	//...show that... and show imdb ratings istead
	if(mRotten_Rating != "N/A"){
		mRotten_Rating = mRotten_Rating.substring(3,mRotten_Rating.length - 3);
		mRotten_Rating = "Rotten Tomatoes Rating: "+mRotten_Rating;
	}
	else{
		mRotten_Rating = body.split("imdbRating")[1].split("imdbVotes")[0];
		mRotten_Rating = mRotten_Rating.substring(3,mRotten_Rating.length - 3);
		mRotten_Rating = "Rotten Tomatoes Rating: N/A ...\n"+"IMDB Rating: "+mRotten_Rating;
	}

	// // * Rotten Tomatoes URL.
	var mRotten_URL = body.split("tomatoURL")[1].split("DVD")[0];
	mRotten_URL = "Rotten Tomatoes URL: "+mRotten_URL.substring(3,mRotten_URL.length - 3);

	var d = new Date();

	var outputText =
		"\n________________________________\nSTART OF OMDB\n"+ d +"\n\n"
		+mTitle+"\n"
		+mYear+"\n"
		+mRating+"\n"
		+mCountry+"\n"
		+mLanguage+"\n"
		+mPlot+"\n"
		+mActors+"\n"
		+mRotten_Rating+"\n"
		+mRotten_URL+"\n"
		+"\nEND OF OMDB\n"+ d +"\n"+"________________________________\n";
	;
	console.log(outputText);
	fs.appendFile('log.txt', (outputText+"\n") );

	callBack();
}


