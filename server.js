const express = require ("express");
const fs = require ("fs");
const path = require ("path");
const PORT = 3000;
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//link to homepage (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
//link to notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//Note array in db.json file
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
//Write notes to db.json file
app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let note = req.body;
    let noteID = uuidv4();
    note.id = noteID;
    savedNotes.push(note);
    console.log("New note created: ", note);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});
//Delete notes from db.json file
app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteID = req.params.id;
    savedNotes = savedNotes.filter(selectedNote => {
        return selectedNote.id !== noteID;  
    });

    console.log("Note deleted!")
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});
//Listener for application
app.listen(PORT, function() {
console.log("Application listening on PORT " + PORT);
});