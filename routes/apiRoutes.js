const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const noteData = require("../data/noteData");
const outputPath = path.join(__dirname, "../db/db.json");

router.route("/notes").get((_req, res) => {
  fs.readFile(outputPath, (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

module.exports = router;
