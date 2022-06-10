const { DataTypes } = require("sequelize");

module.exports = function createNoteModel(sequelize) {
    const Note = sequelize.define("Note", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: "No note-title was provided" },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: "No note-description was provided" },
        },
        archived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });
    return Note;
};
