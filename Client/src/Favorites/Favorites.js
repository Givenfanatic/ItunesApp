import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Favorites.css';
// The `act` function is used to wrap code that causes state updates in React testing.
// When testing components that interact with React state, it's important to ensure that
// the state updates are properly handled. The `act` function ensures that the component
// is correctly rendered and any pending state updates are processed before making assertions.

// The `act` function is imported from the 'react-dom/test-utils' module and should be used
// whenever testing code that triggers state changes, such as event handlers or asynchronous
// operations. By wrapping the state-updating code in `act`, you ensure that React completes
// the state update cycle and updates the component's UI before making assertions or assertions
// about the component's behavior.
import { act } from 'react-dom/test-utils';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Fetch the user's favorites when the component mounts
  useEffect(() => {
    fetch('/api/favorites')
      .then(response => response.json())
      .then(data => {
        act(() => {
          setFavorites(data);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  //function that contains a call to our back end to remove the favorite, we also remove it from the front end according to ID
  function removeFromFavorites(item) {
    const newFavorites = favorites.filter(favorite => favorite.trackId !== item.trackId);
    setFavorites(newFavorites);

    // Make a DELETE request to remove the item from the backend as well
    fetch(`/api/favorites/${item.trackId}`, { method: 'DELETE' })
      .catch(error => {
        console.error(error);
      });
  }

  //return our JSX make sure we have favorites else display to the user there is none
  return (
    <div>
      <h2>{favorites.length !== 0 ? 'Favorites' : 'You do not currently have any favorites, got the search screen to add some!'}</h2>
      <div className="result-container">
        {favorites.map(favorite => (
          <div className="result-item" key={favorite.trackId}>
            <img src={favorite.url} alt="Album artwork" />
            <h3>{favorite.trackname}</h3>
            <p>{favorite.Artist}</p>
            <Button variant="outline-secondary" onClick={() => removeFromFavorites(favorite)}>Remove from Favorites</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
