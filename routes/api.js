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
notes.post("/", (req, res) => {
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