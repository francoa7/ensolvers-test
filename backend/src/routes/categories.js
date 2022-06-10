const express = require("express");
const categoriesRouter = express();
const { Category: CategoryModel } = require("../db");
const { invalidParams } = require("../db/models/Utils");

categoriesRouter.get("/", async (req, res) => {
    try {
        const categories = await CategoryModel.findAll();
        return res.json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
});

categoriesRouter.post("/", async (req, res) => {
    const { name } = req.body;
    const invalid = invalidParams("category", { name });
    if (invalid) return res.status(400).json({ error: invalid.msg });
    try {
    
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = categoriesRouter;
