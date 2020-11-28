const router = require("express").Router();
const fs = require("fs");
const noteData = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

router
  .get("/notes", function (_req, res) {
    res.json(noteData);
  })
  .post("/notes", (req, res) => {
    req.body.id = uuidv4();
    noteData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
      if (err) throw err;
    });
    res.json(noteData);
  })
  .delete("/notes/:id", (req, res) => {
    const noteID = req.params.id;

    for (let i = 0; i < noteData.length; i++) {
      if (noteID === noteData[i].id) {
        noteData.splice(i, 1);
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
      if (err) throw err;
    });
    res.json(noteData);
  });

module.exports = router;
