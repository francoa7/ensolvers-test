const express = require("express");
const categoriesRouter = express();

categoriesRouter.get("/", (req, res) => {
    res.json({ msg: "categoriespage" });
});

module.exports = categoriesRouter;
