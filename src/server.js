const express = require('express'); 
const cors = require('cors');

const setupMongoose = require('./config/db');
const config = require('./config');
const router = require('./router');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(globalErrorHandler);

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
