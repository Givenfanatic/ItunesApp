Testing the API with Postman

Make sure to run npm install to install all required dependencies, ensure to cd to the Server folder

Open the terminal in VS Code by clicking on the "Terminal" menu and selecting "New Terminal".
Make sure you are in the project directory by running the cd command followed by the path to your project directory.
Run the command nodemon server.js or just simply npm start if you are in the server directory to start the API server.
If everything is set up correctly, you should see a message in the terminal that says "Server listening on port [PORT]".



To test the Itunes search API(server.js) with Postman, follow these steps:
Install Postman: https://www.postman.com/downloads/

Open Postman.

Create a new request by clicking the "New" button in the upper left corner of the Postman window.

In the "Create a new request" window, enter a name for the request, such as "Get all web projects", and select the HTTP method you want to use, such as GET.

In the "Enter request URL" field, enter http://localhost:8080/api.

Click the "Send" button to send the request. The response should contain a JSON array of all the web project items.

To add a new web project item, create a new request in Postman, select the HTTP method POST, and enter the following URL: http://localhost:8080/api.

In the "Body" tab, select "raw" and then "JSON" as the data type. Enter the following JSON object in the request body:

JSON example
{
  "artistName": "Juice Wrld",
  "trackName": "robbery",
  "URL": "https://example.com"
}

Click the "Send" button to send the request. The response should contain a message indicating that the favorite item was added or removed depending on the call or errors if any occur.

The server is setup to intercept calls made from our react front end.

To test the back-end cd to Serverh and run npm test, this will run tests with Jest
