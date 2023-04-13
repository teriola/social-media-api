const express = require('express');

const setupMongoose = require('./config/mongoose');
const { PORT } = require('./config/constants');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

// Initialize express app
const app = express();
require('./config/express')(app);

// Import routes and global error handler
app.use(routes);
// app.use(errorHandler);

// Connect to database and start server if successful
setupMongoose()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    })
    .catch(err => {
        console.log(`DB connection error: ${err.message}`);
    });
