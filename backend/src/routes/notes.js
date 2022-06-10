const express = require("express");
const notesRouter = express();
const { Note: NoteModel, User: UserModel } = require("../db");
const { invalidParams } = require("../db/models/Utils");

notesRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.findAll();
        return res.json(notes);
    } catch (error) {
        return res.status(500).json(error);
    }
});

notesRouter.get("/usernotes/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const userNotes = await NoteModel.findAll({ where: { userId } });
        return res.json(userNotes);
    } catch (error) {
        return res.status(500).json(error);
    }
});

notesRouter.get("/:noteId", async (req, res) => {
    const { userId } = req.body;
    const { noteId } = req.params;
    try {
        const note = await NoteModel.findByPk(noteId);
        if (!note) return res.status(400).json({ error: "Note not found" });
        if (note.userId !== userId)
            return res.status(400).json({ error: "Unauthorized" });
        else return res.json(note);
    } catch (error) {
        return res.status(500).json(error);
    }
});

notesRouter.post("/", async (req, res) => {
    const { userId, title, description } = req.body;
    const invalid = invalidParams("note", { userId, title, description });
    if (invalid) return res.status(400).json({ error: invalid.msg });
    if (!UserModel.findByPk(userId))
        return res
            .status(400)
            .json({ error: "No user found with the specified ID" });
    try {
        const createdNote = await NoteModel.create({
            title,
            description,
            userId,
        });
        return res.json(createdNote);
    } catch (error) {
        return res.status(500).json(error);
    }
});

notesRouter.put("/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { type, userId, title, description } = req.body;
    if (type === "archive") {
        try {
            const note = await NoteModel.findByPk(noteId);
            if (!note) return res.status(400).json({ error: "Note not found" });
            if (note.userId !== userId)
                return res.status(400).json({ error: "Unauthorized" });
            else {
                note.archived = !note.archived;
                await note.save();
            }
            return res.json(note);
        } catch (error) {
            return res.status(500).json(error);
        }
    } else if (
        (!title || !title.length) &&
        (!description || !description.length)
    )
        return res.json({
            msg: "No fields updated due to no params were passed",
        });
    try {
        const note = await NoteModel.findByPk(noteId);
        if (!note) return res.status(400).json({ error: "Note not found" });
        if (note.userId !== userId)
            return res.status(400).json({ error: "Unauthorized" });
        else note.update({ title, description });
        return res.json(note);
    } catch (error) {
        return res.status(500).json(error);
    }
});

notesRouter.delete("/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { userId } = req.body;
    try {
        const note = await NoteModel.findByPk(noteId);
        if (!note) return res.status(400).json({ error: "Note not found" });
        if (note.userId.toString() !== userId)
            return res.status(400).json({ error: "Unauthorized" });
        else note.destroy();
        return res.json({ deleted: note });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = notesRouter;
