require("dotenv").config();
//requests needed to run the progeam 
var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');

//these are the commands or the user input & twitter and spotity keys 
var command = process.argv[2];
var name = process.argv[3];
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (command === 'movie-this') {

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

else if (command === 'spotify-this-song') {

    if (name === undefined) {
        spotfiy('The Sign');
    }
    else {
        spotfiy(name);
    }
}

else if (command === 'do-what-it-says') {
    doWhatItSays();
}

else {
    console.log("\n Search For songs by using --> spotify-this-song 'Song's name'");

    console.log("\n Look at the last 20 tweets by using --> my-tweets");

    console.log("\n Search for movies by using --> movie-this ' Movie's Name ' ")

    console.log('\n Or try this comman --> do-what-it-says\n');
}

function myTweets() {
    client.get('statuses/user_timeline', { count: 20 }, function (error, tweets, response) {
        if (error) {
            console.log('it did not work');
            console.log(error);
        }
        else {
            console.log('\n--------------Hereis Your Result(s)--------------------\n')
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

    }); //end of get method 
} // end of tweet func

function spotfiy(song_name) {

    spotify.search({ type: 'track', query: song_name, limit: 10 }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        else {
            console.log('\n--------------Hereis Your Result(s)--------------------\n')

            var findSong = data.tracks.items.filter(function (obj) {
                //this is used for search enhancement so that if type lower or upper 
                var BetterSearchResult = obj.name.toUpperCase();
                if ( BetterSearchResult.includes( song_name.toUpperCase() )) {

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
            console.log('\n--------------Hereis Your Result(s)--------------------\n');

            console.log("Movie's plot : " + JSON.parse(response.body).Plot);

            console.log("The movie's IMDB rating : " + JSON.parse(response.body).imdbRating);

            if (JSON.parse(response.body).Ratings[1] === undefined) {
                //Some movies do not have this rating. If they do not we tell user that it's not avilable
                console.log('Rotten Tomatoes Rating of the movie : No Data available')
            }
            else {

                console.log('Rotten Tomatoes Rating of the movie : ' + JSON.parse(response.body).Ratings[1].Value);
            }

            console.log("Title : " + JSON.parse(response.body).Title);

            console.log("Language : " + JSON.parse(response.body).Language);

            console.log("Actors : " + JSON.parse(response.body).Actors);

            console.log("Country : " + JSON.parse(response.body).Country);

            console.log('Year : ' + JSON.parse(response.body).Year);

        }
    });

} //end of movie function

function doWhatItSays() {

    fs.readFile('random.txt', 'utf8', function (err, data) {

        if (err) {
            console.log(err);
        }
        else {
            var dataArr = data.split(',');
            console.log(dataArr);
            spotfiy(dataArr[1]);
        }
    })

} //end of do what is says func








