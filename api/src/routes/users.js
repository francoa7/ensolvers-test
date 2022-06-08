const express = require("express");
const userRouter = express();
const { User: UserModel } = require("../db");
const { invalidParams } = require("../db/models/Utils");

userRouter.get("/", async (req, res) => {
    const users = await UserModel.findAll();
    res.json({ users });
});

userRouter.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    const invalid = invalidParams("user", { username, email, password });
    if (invalid) return res.status(400).json({ error: invalid.msg });
    const existing = await UserModel.findOne({ where: { email } });
    if (existing) return res.json({ error: "email already registered" });
    const createdUser = await UserModel.create({
        username,
        email,
        password,
    });
    res.json({ createdUser });
});

module.exports = userRouter;
