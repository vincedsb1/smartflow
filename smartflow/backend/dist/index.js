"use strict";
// Load environnement variables from .env file
require("dotenv").config();
//Import express application from src/app.js
const app = require("./app");
//Get the port from the environment variable
const port = process.env.APP_PORT;
//Start the server and listen on the specified port
app
    .listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
    .on("error", (err) => {
    console.error("Error starting server:", err.message);
});
