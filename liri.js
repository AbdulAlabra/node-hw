
require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');

var Spotify = keys.spotify;

// twitter is working now
var client = new Twitter(keys.twitter);



// id: 2722037155,
// id_str: '2722037155',
// name: 'INRTracker',
// screen_name: 'INRTracker',





//these are the commands lclearine 
var command = process.argv[2];
var movieName = process.argv[3];



/*
 Make it so liri.js can take in one of the following commands:

* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

we may use some if else statements to check user input. (process.argv)maybe ???  */
if (command === 'movie') { 
    
    if(movieName === undefined) {
        showMovie('Mr.nobody');
    }
    else { 
        showMovie(movieName);
    }   
}

else if (command === 'my-tweets') {
    myTweets();
}

function myTweets() {

    client.get('statuses/user_timeline', { count: 20 }, function (error, tweets, response) {
        if (error) {
            console.log('it did not work');
            console.log(error);
        }

        else {
            //this is like the for looping but this one is less code.  
            var my_tweets = tweets.filter( function (textVal) {
                return console.log('Your Tweet: ' + '" ' + textVal.text + ' "' + '\nPosted on: ' + textVal.created_at + '\n');
            });
        }

        //if you want to post something use this code below..
        // client.post('statuses/update', { status: 'Hi Twit' }, function (error, tweet, response) {
        //     if (error) throw error;
        //     console.log(tweet);  // Tweet body.
        // });

    }); // end of tweet func
}

function spotfiy(song_name) {
    //do some thing when they type a song 

    /* 
    This will show the following information about the song in your terminal/bash window
    Artist(s)
    The song's name
    A preview link of the song from Spotify
    The album that the song is from */

    // If no song is provided then your program will default to "The Sign" by Ace of Base
}

function showMovie(movie_name) {
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function (error, response) {

        if (!error && response.statusCode === 200) {

            console.log("The movie's rating is: " + JSON.parse(response.body).imdbRating);

            console.log("Title : " + JSON.parse(response.body).Title);

            console.log("Language : " + JSON.parse(response.body).Language);

            console.log("Actors : " + JSON.parse(response.body).Actors);

            console.log("Country : " + JSON.parse(response.body).Country);

        }
    });

} //end of movie function


function doWhatItSays() {

}

