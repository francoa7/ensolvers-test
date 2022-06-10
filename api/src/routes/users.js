const express = require("express");
const userRouter = express();
const { User: UserModel } = require("../db");
const { invalidParams } = require("../db/models/Utils");

userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.findAll();
        return res.json({ users });
    } catch (error) {
        return res.status(500).json(error);
    }
});

userRouter.get("/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (user) return res.json(user);
        else return res.json({ msg: "User does not exist" });
    } catch (error) {
        return res.status(500).json(error);
    }
});

userRouter.post("/", async (req, res) => {
    const { username, email } = req.body;
    const invalid = invalidParams("user", { username, email });

    if (invalid) return res.status(400).json({ error: invalid.msg });
    try {
        const existing = await UserModel.findOne({ where: { email } });
        if (existing) return res.json({ error: "email already registered" });
        const createdUser = await UserModel.create({
            username,
            email,
        });
        return res.json({ createdUser });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = userRouter;
