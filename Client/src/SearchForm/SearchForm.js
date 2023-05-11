import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SearchForm.css';
import Alert from 'react-bootstrap/Alert';

function SearchForm() {
    //our state to set the search term
    const [searchTerm, setSearchTerm] = useState('');
    //our state to set the media type, initialised as all
    const [mediaType, setMediaType] = useState('all');
    //use states to set our results that we get from the back end
    const [results, setResults] = useState([]);
    //use state to set our favorites as the user adds them
    const [favorites, setFavorites] = useState([]);
    //state to display our success Alerts in JSX
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    //state to display our error Alerts in JSX
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    //this will let the user know if they have already added this favorite
    const [showAlreadyExists, setAlreadyExists] = useState(false);

    //function that will get the data to our back-end which will in turn go get the data from the itunes api and then return it
    function handleSubmit(event) {
        event.preventDefault();

        const searchUrl = `api/search?term=${searchTerm}&media=${mediaType}`;

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                //set our results
                setResults(data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }

    //call to our backend to add the users favorites
    function addToFavorites(result) {
        const url = `api/favorites`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })
            .then(response => {
                if (response.status === 200) {
                    setFavorites([...favorites, result]); //the spread operator (...) is used to create a new array that includes all the elements from the favorites array and adds the result at the end.
                    setShowSuccessAlert(true); // set the value of showSuccessAlert to true to display our success Alert
                    setTimeout(() => {
                        setShowSuccessAlert(false);
                    }, 1000); // hide the alert after 3 seconds
                } else if (response.status === 400) {
                    setShowErrorAlert(true); // set the value of showErrorAlert to true to show our error alert
                    setAlreadyExists(true); // will let the user know that the favorite already exists
                    setTimeout(() => {
                        setShowErrorAlert(false);
                        setAlreadyExists(false);
                    }, 1000); // hides the alerts after 3 seconds
                }
            })
            .catch(error => {
                console.error(error);
                setShowErrorAlert(true); // set the value of showErrorAlert to true
                setTimeout(() => {
                    setShowErrorAlert(false);
                }, 1000); // hide the alert after 3 seconds
            });
    }



    return (
        <div className="search-form">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formSearchTerm">
                    <Form.Label>Search Term</Form.Label>
                    <Form.Control type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formMediaType">
                    <Form.Label>Media Type</Form.Label>
                    <Form.Control as="select" value={mediaType} onChange={event => setMediaType(event.target.value)}>
                        <option value="all">All</option>
                        <option value="movie">Movie</option>
                        <option value="podcast">Podcast</option>
                        <option value="music">Music</option>
                        <option value="audiobook">Audiobook</option>
                        <option value="shortFilm">Short Film</option>
                        <option value="tvShow">TV Show</option>
                        <option value="software">Software</option>
                        <option value="ebook">Ebook</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginBottom: '10px' }}>Search</Button>
            </Form>

            {results.length > 0 ? <h2 style={{ textAlign: 'center' }}>Search Results:</h2> : null}
            {showSuccessAlert && (
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                    Favorite successfully added!
                </Alert>
            )}
            {showErrorAlert && (
                <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                    {showAlreadyExists ? 'Favorite already added' : 'Favorite could not be added!'}
                </Alert>
            )}
            <div className="result-container">
                {results.map(result => (
                    <div className="result-item" key={result.trackId}>
                        <img src={result.artworkUrl100} alt="Album artwork" />
                        <h3>{result.trackName}</h3>
                        <p>{result.artistName}</p>
                        <Button variant="outline-secondary" onClick={() => addToFavorites(result)}>Add to Favorites</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchForm;
