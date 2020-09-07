const express = require ("express");
const fs = require ("fs");
const path = require ("path");
const PORT = 3000;
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    res.json(savedNotes[String(req.params.id)]);
});

app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let note = req.body;
    let noteID = uuidv4();
    note.id = noteID;
    savedNotes.push(note);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteID = req.params.id;
    let newID = 0;
    savedNotes = savedNotes.filter(selectedNote => {
        return selectedNote.id !== noteID;
    });

    for (selectedNote of savedNotes) {
        selectedNote.id = newID.toString();
        newID++;
    };

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

//Listener for application
app.listen(PORT, function() {
console.log("Application listening on PORT " + PORT);
});