
require("dotenv").config();
var request = require("request");

// Add the code required to import the keys.js file and store it in a variable ?????.

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)

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
    movieThis(movieName);
}

function myTweets() {
    //do some thing when they type twitter 
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

function movieThis(movie_name) {
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


