const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fetch = require('node-fetch');
const fs = require('fs');

// this needs to be before our routes to parse incoming requests as JSON
app.use(bodyParser.json());

//Helmet for extra security within our app
app.use(helmet());

// we will be storing all the users favorites in this array to then return it when they navigate to the favorites page
const favoritesArray = [];

// Endpoint for search query
app.get('/api/search', (req, res) => {
  //get the item we searching for from frontend
  const searchTerm = req.query.term;
  //get the media type to search for from the front end
  const mediaType = req.query.media;

  //url that we will be getting our data from
  const searchUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`;

  // fetch the data 
  fetch(searchUrl)
  //convert the data to JSON
    .then(response => response.json())
    //send the data back to the front end
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      //if anything goes wrong inform the user of it
      res.status(500).send('The server returned an error');
    });
});

// Favorites list endpoint
app.get('/api/favorites', (req, res) => {
  try{
    if(favoritesArray.length <= 0){
      // if the user doesn't have any favorites inform them to add some
      res.send('You dont currently have any favorites, go to the search screen and add some!')
    }else{
      //return the users favorites
      res.json(favoritesArray);
    }
  }catch(err){
    console.log(err);
  }
});

//endpoint to add a new favorite
app.post('/api/favorites', (req, res) => {
  try {
    //set the favorite from the request body
    const favorite = req.body;
    //check if the req body is an empty object then send an error back and return as to not fill our array with empty objects
    if (req.body == {}) {
      res.send('empty object sent').statusCode(400);
      return;
    }

    //check if the favorite is already in our list
    const alreadyExists = favoritesArray.find(fav => fav.trackname === favorite.trackName && fav.Artist === favorite.artistName && fav.url === favorite.artworkUrl100);

    //if the favorite is alrady in our array return an error stating that it is already on the list
    if (alreadyExists) {
      res.status(400).send("Favorite already exists in the list");
    } else {
      //add the favorite to our list, only saving key info to display to the user
      favoritesArray.push({ trackname: favorite.trackName, Artist: favorite.artistName, url: favorite.artworkUrl100, trackId: favorite.trackId })
      res.send("Favorite successfully added!");
    }
  } catch (err) {
    console.log(err)
    res.send(err);
  }
});

//endpoint to delete a favorite
app.delete('/api/favorites/:id', (req, res) => {
  // get the favorites id tha we will be removing from the parameters
  const id = Number(req.params.id); // Convert the id parameter to a number

  //find the favorite according to id in our array
  const index = favoritesArray.findIndex(favorite => favorite.trackId === id);
  //make sure that the favorite exists and then remove it and send a success to the front end
  if (index !== -1) {
    favoritesArray.splice(index, 1);
    res.status(200).send('Removed from favorites');
  } else {
    //let the user know the item is not in their favorites
    res.status(200).send('Not in favorites');
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
