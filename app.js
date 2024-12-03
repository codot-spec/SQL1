const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const User = require('./util/database');

const app = express();
const userRoutes = require('./routes/user');  // Importing user routes

app.use(cors());  // Allows cross-origin requests

app.use(bodyParser.json());  // Use JSON for API requests
app.use('/user', userRoutes);  // Use /user routes for user operations

User.sync()
  .then(() => {
    console.log('User table created successfully');
  })
  .catch(err => {
    console.error('Error creating User table:', err);
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
