Dynamic User Profile API:
Build a dynamic API (Application Programming Interface) designed for retrieving user information from a predefined roster. This API empowers you to dynamically generate profile cards on demand for any user within the roster.

Technologies Used:
Express.js: A robust web framework for Node.js, used to swiftly construct the API.
Node.js: A JavaScript runtime environment used to execute server-side code.
JavaScript: The primary programming language used for server-side scripting.
JSON: A lightweight data-interchange format used for storing user information.

Getting Started
To set up and run the API locally, follow these steps:
Clone this repository to your local machine.
Install Node.js if you haven't already.
Navigate to the project directory in your terminal.
Run npm install to install the required dependencies.
Start the server by running npm start.
The API will be accessible at http://localhost:8000.

API Endpoints:
GET /users: Retrieve information about all users in the roster.
GET /users/:id: Retrieve information about a specific user by their unique ID.
POST /users: Add a new user to the roster.
PUT /users/:id: Update information about a specific user.
DELETE /users/:id: Delete a user from the roster.

Usage:
Retrieving User Information
To retrieve information about all users, make a GET request to /users.
To retrieve information about a specific user, make a GET request to /users/:id, replacing :id with the user's ID.

Adding a New User
To add a new user to the roster, make a POST request to /users with the user's information in the request body.

Updating User Information
To update information about a specific user, make a PUT request to /users/:id with the user's ID in the URL and the updated information in the request body.

Deleting a User
To delete a user from the roster, make a DELETE request to /users/:id with the user's ID in the URL.