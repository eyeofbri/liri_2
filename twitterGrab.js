var keys = require('./keys');
var temp_twitterKeys = keys.twitterKeys;
var Twitter = require('twitter');

var fs = require('fs');


module.exports = function() {

	this.Twitter_Search = function(callBack) {
		 
		var client = new Twitter({
		  consumer_key: temp_twitterKeys.consumer_key,
		  consumer_secret: temp_twitterKeys.consumer_secret,
		  access_token_key: temp_twitterKeys.access_token_key,
		  access_token_secret: temp_twitterKeys.access_token_secret
		});
		 
		var params = {screen_name: 'eyeofbri'};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    logTweets(tweets, callBack);
		  }
		});
	}
}


function logTweets(tweets, callBack) {

	var d = new Date();

	var outputText_1 = "\n\n________________________________\nSTART OF TWEETS\n"+ d +"\n";
	console.log(outputText_1);
	fs.appendFile('log.txt', outputText_1 );

	for (var i = 0; i < tweets.length; i++) {
		var id = tweets[i].id;
		var text = tweets[i].text;

		var outputText_2 = 
			"\nTweet: "+ (i + 1 ) +"\n"
			+"ID: "+id+"\n"
			+text
		;
		console.log(outputText_2);
		fs.appendFile('log.txt', (outputText_2+"\n") );
	}

	var outputText_3 ="\nEND OF TWEETS\n"+ d +"\n"+"________________________________\n\n";
	console.log(outputText_3);
	fs.appendFile('log.txt', outputText_3 );

	callBack();
}