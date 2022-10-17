// Dependencies
const app = require("express").Router();
const fs = require("fs");

const db = require("../db/db.json");
const path = require("path");
var uniqid = require("uniqid");

//GET Request
app.get("/api/notes", (req, res) => {
  fs.readFile(db).then((data) => {
    console.log(data);
    res.json(JSON.parse(data))
  })
  .catch((err) => {
    console.error('Data error', err);
  })
});

//POST request
app.post("/api/notes", (req, res) => {
  const newNotes = {
    title: req.body.title,
    text: req.body.text,
    id: uniqid(),
  };
  fs.readFile(newNotes, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData = JSON.parse(data);
      parsedData.push(newNotes);
      fs.writeFile(db, JSON.stringify(parsedData, null, 4), (err) => {
        err
          ? console.error(err)
          : console.info(`\nData written to ${destination}`);
      });
    }
  });
});

app.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const allNotes = JSON.parse(data);
    const newAllNotes = allNotes.filter((note) => note.id != noteId);

    fs.writeFile(
      "./db/db.json",
      JSON.stringify(newAllNotes, null, 2),
      (err) => {
        if (err) throw err;
        res.send(db);
        console.log("Note deleted!");
      }
    );
  });
});

module.exports = app;
