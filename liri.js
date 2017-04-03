var inquirer = require("inquirer");
var fs = require('fs');

var twitter = require('./twitterGrab.js')();
var spotify = require('./spotifyGrab.js')();
var omdb = require('./omdbGrab.js')();
var weather = require('./weatherGrab.js')();

var programStarted = false;

function liri() {
	inquirer.prompt([
		{
		    type: "list",
	    	message: mainMessage(),
	    	choices: [
	    		"Display Brian's Tweets", 
	    		"Spotify A Song", 
	    		"Find Some Movie Info",
	    		"Get A Weather Forecast", 
	    		"I'll Type My Inputs, Thank You Please.",
	    		"Quit"
	    	],
	    	name: "command"
		}
	]).then(function(results) {

		switch (results.command) {
		  case "Display Brian's Tweets":
		    Twitter_Search(liri);
		    break;

		  case "Spotify A Song":
		    Spotify_Search(liri);
		    break;

		  case "Find Some Movie Info":
		   	OMDB_Search(liri);
		    break;

		  case "Get A Weather Forecast":
		    getWeather_location(liri);
		    break;

		  case "I'll Type My Inputs, Thank You Please.":
		    userTextInput();
		    break;
		  case "Quit":
		    console.log("\nYou Quit Brian's Liri CLI App.\n\n\n");
		    break;
		}

	});
}

function userTextInput() {
	inquirer.prompt([
			{
			    type: "input",
			    message: "\nAwaiting User Input:",
			    name: "user_input"
			}
	]).then(function(userResults) {
			var fullResult = userResults.user_input.split(" ");
			var command = fullResult[0];
			var command_detail = fullResult.slice(1).join(" ");
			executeCommands(command, command_detail);
	});
}

function executeCommands(whatToDo, detail) {

	var d = new Date();

	if(whatToDo == "do-what-it-says" || whatToDo == "d"){
		fs.readFile('random.txt', "utf8", function(err, data) {
		    if(err) throw err;
		    var array = data.toString().split(",");
		    var newCommand = array[0];
		    var newDetail = array[1].replace(/\"/g, "");

		    var outputText = 
		    	"\n\n________________________________\nSTART OF TEXT INPUT COMMAND\n"+ d +"\n\n"
				+"COMMAND: "+newCommand +"\n"+ newDetail+"\n"
				+"\nEND OF TEXT INPUT COMMAND\n"+ d +"\n"+"________________________________\n\n";

		    console.log(outputText);
			fs.appendFile('log.txt', (outputText+"\n") );
		    executeCommands(newCommand, newDetail)
		});
	}

	if(whatToDo == "my-tweets" || whatToDo == "t"){
		Twitter_Search(liri);

	}else if(whatToDo == "spotify-this-song" || whatToDo == "s"){
		var songName = detail;
		Spotify_withSong(songName, liri);

	}else if(whatToDo == "movie-this" || whatToDo == "m"){
		var movieName = detail;
		OMDB_withMovie(movieName, liri);
	}else{
		console.log("\n\n\nYou're text input was not accepted.\n\n\n");
		liri();
	}
}


function mainMessage() {
	var choices = [", Now", ", Next", ", This Time", ""];
	if(programStarted == true){ 
		return ("What would you like to do"
			+choices[Math.floor(Math.random() * 4 )]+"?\n" );
	}else{ 
		programStarted = true; 
		return ("What would you like to do?\n"); 
	}
}


function startUp(argument) {
	console.log(
		"\n\n\n\n\n\n\n\n"
		+"Welcome to Brian's Liri CLI App!\n"
		+"________________________________")
	liri();
}


startUp();