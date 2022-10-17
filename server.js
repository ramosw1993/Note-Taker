const express = require("express");
const path = require("path");

//routes
const api = require("./routes/api");

const PORT = 3001;

const app = express();

//Middleware for parsing JSON and urlencoded form data, static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//console log the port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
