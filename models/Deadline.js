const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Deadline = sequelize.define("Deadline", {
        deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

    Deadline.associate = function (models) {

        Deadline.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false,
            },
            onDelete: 'cascade'
        });
    };

    return Deadline;
}