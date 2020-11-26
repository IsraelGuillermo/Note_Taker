const router = require("express").Router();
const fs = require("fs");
const noteData = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

router
  .route("/notes")
  .get((_req, res) => {
    res.json(noteData);
  })
  .post((req, res) => {
    req.body.id = uuidv4();
    noteData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
      if (err) throw err;
    });
    res.json(noteData);
  });

module.exports = router;
