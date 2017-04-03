var inquirer = require("inquirer");
var spotify = require('spotify');
var fs = require('fs');

module.exports = function() {
	this.Spotify_Search = function(callBack) {
		inquirer.prompt([
			{
		    	type: "input",
		   		message: "\nPlease Enter A Song Title:",
		  		name: "query"
			}
		]).then(function(results) {
			var songName = results.query;
			if(!songName){ 
				console.log("\nNo Song Entered,\nSearching Spotify For: Ace Of Base - The Sign");
				songName = "The Sign"; 
			}else{
				console.log("\nSearching Spotify For: "+songName);
			}
		 
			spotify.search({ type: 'track', query: songName }, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			        return;
			    } 	
				logMusic(data.tracks.items, songName, callBack);
			});

		});
	}

	this.Spotify_withSong = function(songName, callBack) {
		if(!songName){ 
			console.log("\nNo Song Entered,\nSearching Spotify For: Ace Of Base - The Sign");
			songName = "The Sign"; 
		}else{
			console.log("\nSearching Spotify For: "+songName);
		}
		 
		spotify.search({ type: 'track', query: songName }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
			        return;
		    } 	
			logMusic(data.tracks.items, songName, callBack);
		});
	}
}


function logMusic(trackItems, songName, callBack) {

	var d = new Date();

    var songInfo = trackItems[0];

	if(songName == "The Sign"){
		for (var i = 0; i < trackItems.length; i++) {
			if(trackItems[i].artists[0].name == "Ace of Base"){
				songInfo = trackItems[i];
				break;
			}
		}
	}

	var artist = "Artist: "+songInfo.artists[0].name; //there may be more than one artist, just grab the first
	var name = "Track Name: "+songInfo.name;
	var preview = "Preview URL: "+songInfo.preview_url;
	var album = "Album Title: "+songInfo.album.name;

	var outputText =
		"\n________________________________\nSTART OF SPOTIFY\n"+ d +"\n\n"
		+artist+"\n"+name+"\n"+preview+"\n"+album+"\n"
		+"\nEND OF SPOTIFY\n"+ d +"\n"+"________________________________\n";
	;

	console.log(outputText);
	fs.appendFile('log.txt', (outputText+"\n") );

	callBack();
}
