
require("dotenv").config();

//requests needed to run the progeam 
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//these are the commands or the user input  
var command = process.argv[2];
var name = process.argv[3];

if (command === 'movie') {

    if (name === undefined) {
        showMovie('Mr.nobody');
    }
    else {
        showMovie(name);
    }
}

else if (command === 'my-tweets') {
    myTweets();
}

else if (command === 'spotify') {

    if (name === undefined) {
        spotfiy('The Sign');
    }
    else {
        spotfiy(name);
    }
}



function myTweets() {

    client.get('statuses/user_timeline', { count: 20 }, function (error, tweets, response) {
        if (error) {
            console.log('it did not work');
            console.log(error);
        }
        else {
            //this is like the for loop but this one is less code.  
            var my_tweets = tweets.filter(function (Obj) {
                return console.log('Your Tweet: ' + '" ' + Obj.text + ' "' + '\nPosted on: ' + Obj.created_at + '\n');
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

    spotify.search({ type: 'track', query: song_name, limit: 20 }, function (err, data) {
        console.log('\n--------------Hereis Your Result(s)--------------------\n')
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        else {
            var findSong = data.tracks.items.filter(function (obj) {
                
                if (obj.name == song_name) {
                    return console.log('Song Name: ' + obj.name + '\nArtist Name: ' + obj.artists[0].name + '\nAlbum: ' + obj.album.name + '\nPreview Link: ' + obj.preview_url + '\n');
                }
            });
        } //end of else statement
    }); //end of spotify search
} //end of spotify fuction

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










// New Spotify keys that I registred for in case you want to use them
// SPOTIFY_ID=63985eca244242d4809e95e313fb986d
// SPOTIFY_SECRET=a135632f4d3849a494ef9257a8dc0f37