const express = require('express');
const app = express();
require('dotenv').config();
const connectToMongoDB = require("./db/mongodb");
const logger = require("morgan");

/*CORS*/
// Prevent CORS issue
const cors = require('cors');

// Update corsOptions to have ALL origins given access
const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}

/*MIDDLEWARE */
app.use(logger("dev"));
// This will read form data properly
app.use(express.urlencoded({ extended: false }));
// This will read JSON properly
app.use(express.json());
// This will allow us to test both servers locally
app.use(cors(corsOptions));

/*ROUTES*/

const mcuRouter = require("./routes/mcuRouter");
// localhost:3001/api/.....
app.use('/api', mcuRouter);

// SERVER POWER

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);

    connectToMongoDB();
})