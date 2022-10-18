// Dependencies
const express = require("express");
const apiRouter = require("./api.js");

const app = express();

// Routing
app.use('/notes', apiRouter);

module.exports = app;
