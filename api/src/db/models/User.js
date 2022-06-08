const { DataTypes } = require("sequelize");

module.exports = function createUserModel(sequelize) {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: "No user-username was provided" },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: { msg: "Not a valid email format was passed" },
            notNull: { msg: "No user-email was provided" },
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: "No user-password was provided" },
        },
    });
    return User;
};
