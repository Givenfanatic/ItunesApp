This is a simple React web application that displays a list of web projects and allows users to add, edit and delete projects.

Please read the ReadMe.md in the Server file on how to run the backend to process API calls to enable you to load,update and delete the projects

Getting Started
To run this application, you will need to have Node.js installed on your machine. Clone this repository and run the following commands:

npm install
npm start
This will start the development server and launch the application in your default browser.

Dependencies
This application uses the following dependencies:

React
react-bootstrap
Node.js
How It Works
The application has the following features:

Displaying Items that were searched for
On the home page, a form is displayed, the user can enter anything and then select the media type to link to their search term, if the Itunes API has data matching our search then the results will be displayed to the user.

Adding a Favorite
The user can click on the add favorites button to add their favorites which will be available on the Favorites screen.


Deleting a Favorite
The user can remove a favorite by going to the favorites screen and selecting the remove from favorites button which will remove it in the back end as well as in the front end.

Code Structure
The main React component is defined in App.js where all the routes can be found. The state variables are defined using the useState hook, and the useEffect hook is used to fetch data from the backend.

The functions for handling the different actions (adding, and deleting favorites) are defined in SearchForm.js and Favorites.js.

The UI is implemented using the react-bootstrap library.

To test the front-end cd to Client->Itunessearch and run npm test

Acknowledgements
This project was created using the React Bootstrap Starter template.