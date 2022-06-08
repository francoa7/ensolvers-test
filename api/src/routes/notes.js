const express = require("express");
const notesRouter = express();
const { Note: NoteModel } = require("../db");
const { invalidParams } = require("../db/models/Utils");

notesRouter.get("/", async (req, res) => {
    const notes = await NoteModel.findAll();
    res.json(notes);
});

notesRouter.post("/", async (req, res) => {
    const { userId, title, description } = req.body;
    const invalid = invalidParams("note", { userId, title, description });
    if (invalid) return res.status(400).json({ error: invalid.msg });
    const createdNote = await NoteModel.create({
        title,
        description,
        userId,
    });
    res.json(createdNote);
});

module.exports = notesRouter;
