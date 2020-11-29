// DEPENDENCIES
//===============================================
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

// ROUTES
//===============================================
module.exports = function (app) {
    // GET request reads notes saved in db.json file (R in CRUD)
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            const notes = JSON.parse(data);
            res.json(notes);
        });
    });

    // POST requests adds new notes to db.json (C in CRUD)
    app.post("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            const notes = JSON.parse(data);
            // uuid adds unique id to each note
            req.body.id = uuidv4();
            notes.push(req.body);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
                if (err) {
                    return console.log(err);
                }
                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
        });
    });

    // DELETE request deletes selected note from db.json (D in CRUD)
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            const notes = JSON.parse(data);
            // compares selected note id to ids in db.json
            const filteredNotes = notes.filter(function (item) {
                return item.id !== req.params.id;
            })
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes), function (err) {
                if (err) {
                    return console.log(err);
                }
                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
        })
    });
};