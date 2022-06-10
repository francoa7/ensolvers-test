const express = require("express");
const router = express();
const usersRouter = require("./users");
const notesRouter = require("./notes");
const categoriesRouter = require("./categories");

router.use(express.json());
router.use("/users", usersRouter);
router.use("/notes", notesRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
