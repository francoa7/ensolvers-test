const { Sequelize, DataTypes } = require("sequelize");
const createUserModel = require("./models/User");
const createNoteModel = require("./models/Note");
const createCategoryModel = require("./models/Category");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Conection to the database
const sequelize =
    process.env.NODE_ENV === "production"
        ? new Sequelize({
              database: DB_NAME,
              dialect: "postgres",
              host: DB_HOST,
              port: 5432,
              username: DB_USER,
              password: DB_PASSWORD,
              pool: {
                  max: 3,
                  min: 1,
                  idle: 10000,
              },
              dialectOptions: {
                  ssl: {
                      require: true,
                      rejectUnauthorized: false,
                  },
                  keepAlive: true,
              },
              ssl: true,
          })
        : new Sequelize("notes", "postgres", "17273747576777", {
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
