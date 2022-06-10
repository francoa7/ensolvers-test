const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});
app.use("/", routes);
app.get("/favicon.ico", (req, res) => {
    const filepath = path.join(__dirname, "../../../client/public/favicon.ico");

    res.sendFile(filepath);
});

module.exports = app;
