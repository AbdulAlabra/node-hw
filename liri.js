
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable ?????.

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

/*
 Make it so liri.js can take in one of the following commands:

* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

we may use some if else statements to check user input. (process.argv)maybe ???  */
if (command === 'movie-this') {
    movieThis();
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

   /* 
   * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * use trilogy key 
     */
}

function doWhatItSays() {

} 