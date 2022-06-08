const { Sequelize, DataTypes } = require("sequelize");
const createUserModel = require("./models/User");
const createNoteModel = require("./models/Note");
const createCategoryModel = require("./models/Category");

// Conection to the database
const sequelize = new Sequelize("notes", "postgres", "17273747576777", {
    host: "localhost",
    dialect: "postgres",
    logging: false,
});

// Creation of each one of the models
const User = createUserModel(sequelize);
const Note = createNoteModel(sequelize);
const Category = createCategoryModel(sequelize);

// Creation of the relationships between the models
User.hasMany(Note, { foreignKey: "userId" });
Category.belongsToMany(Note, { through: "Note-Categories" });

// Exporting the models and the database in case we need them
module.exports = {
    User,
    Note,
    Category,
    db: sequelize,
};
