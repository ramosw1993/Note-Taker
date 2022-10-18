// Dependencies
const notes = require("express").Router();
const fs = require("fs");
require("../db/db.json");
const uniqid = require("../helper/uuid"); 

//GET Request
notes.get("/", (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data))
    }
  });
});

//POST request
notes.post('/api/notes', (req, res) => {
  let db = fs.readFileSync('db/db.json');
  db = JSON.parse(db);
  res.json(db);
  // creating body for note
  let userNote = {
    title: req.body.title,
    text: req.body.text,
    id: uniqid(),
  };
  // pushing created note to be written in the db.json file
  db.push(userNote);
  fs.writeFileSync('db/db.json', JSON.stringify(db));
  res.json(db);
});

notes.delete("/:id", (req, res) => {
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

module.exports = notes;