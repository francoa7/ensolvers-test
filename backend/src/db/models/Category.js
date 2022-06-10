const { DataTypes } = require("sequelize");

module.exports = function createCategoryModel(sequelize) {
    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            notNull: { msg: "No category-name was provided" },
        },
    });
    return Category;
};
