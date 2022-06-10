const { db, User, Note, Category } = require("./src/db");
const app = require("./src/app");

// Saving all and starting the database
db.sync({ force: false }).then(async () => {
    console.log("All models were forced.");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`listening on port ${process.env.PORT || "5000"}`);
    });
});
