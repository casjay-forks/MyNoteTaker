const express = require("express");
const fs = require ("fs");
const path = require ("path");
const PORT = 3000;
var app = express();
var db = require("")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("assets/css/style.css", function(req, res) {
    res.sendFile(path.join(__dirname, "public/assets/css/styles.css"));
});

app.get("assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "public/assets/js/index.js"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});






//Listener for application
app.listen(PORT, function() {
console.log("Application listening on PORT " + PORT);
});