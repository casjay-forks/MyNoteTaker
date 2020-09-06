const express = require("express");
const fs = require ("fs");
const path = require ("path");
const PORT = 3000;
var app = express();
var db = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const noteData = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) throw err;
}) 
);

const updateData = noteData => {
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(noteData), err => {
        if (err) throw err;
        });
};

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(noteData);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    var id = noteData.length;
    newNote.id = id + 1;
    noteData.push(newNote);
    updateData(noteData);
    return res.json(noteData);
});

app.delete("/api/notes/:id", (req, res) => {
    var id = req.params.id;
    var x = 1;
    delete noteData[id - 1];
    updateData(noteData);
    res.send(noteData);
});

//Listener for application
app.listen(PORT, function() {
console.log("Application listening on PORT " + PORT);
});