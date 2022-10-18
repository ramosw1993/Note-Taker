const express = require("express");
const path = require("path");

//routes
const api = require("./routes/api");
const html = require("./routes/html");

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware for parsing JSON and urlencoded form data, static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", api);
app.use("/", html);

//console log the port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});