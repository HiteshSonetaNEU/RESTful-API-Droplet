const express = require("express");
const cors = require("cors");
const users = require("./data/users");
const bodyParser = require('body-parser');
const fs = require('fs');

// set up Express app
const app = express();
const port = 8000;
// set up CORS
app.use(cors());
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next(); // Move to the next middleware or endpoint handler
};
app.use((req, res, next) => {
  logRequest(req, res, next);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (!Number.isInteger(parsedId)) {
      throw { status: 400, message: "Invalid `id` provided" };
    }

    const user = users.find((m) => m.id === parsedId);

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    res.send(user);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message || "Internal Server Error" });
  }
});

app.post('/users', (req, res) => {
  
    // Extract user data from the request body
    const userData = req.body;

    // Add the new user data to the users array
    users.push(userData);

    // Write the updated users array back to the users.js file
    fs.writeFileSync('./data/users.js', `const users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = users;`);

    res.status(201).json({ message: 'User data added successfully' });
   
});

app.delete('/users/:id', (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = parseInt(req.params.id);

    // Find the index of the user with the specified ID in the users array
    const userIndex = users.findIndex(user => user.id === userId);

    // If the user with the specified ID is found, remove it from the array
    if (userIndex !== -1) {
      users.splice(userIndex, 1);

      // Write the updated users array back to the users.js file
      fs.writeFileSync('./data/users.js', `const users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = users;`);

      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error while deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/users/:id', (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = parseInt(req.params.id);

    // Find the index of the user with the specified ID in the users array
    const userIndex = users.findIndex(user => user.id === userId);

    // If the user with the specified ID is found, update their data
    if (userIndex !== -1) {
      // Extract updated user data from the request body
      const updatedUserData = req.body;

      // Update the user data in the array
      users[userIndex] = { ...users[userIndex], ...updatedUserData };

      // Write the updated users array back to the users.js file
      fs.writeFileSync('./data/users.js', `const users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = users;`);

      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error while updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// print success message to console
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
