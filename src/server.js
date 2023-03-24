const express = require('express');
const cors = require('cors');

const setupMongoose = require('./config/db');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');

// Initialize express app and middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import routes and error handler
// app.use('/users', userRoutes);
app.use('/posts', require('./routes/postRoutes'));
app.use(errorHandler);

// Connect to database and start server if successful
setupMongoose()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT}`)
    });
  })
  .catch(err => {
    console.log(`DB connection error: ${err.message}`);
  });
