const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Project.associate = function (models) {

        Project.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            }
        });
    };

    return Project;
}