const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Problem = sequelize.define("Problem", {
        problem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        solved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Problem.associate = function (models) {

        Problem.belongsTo(models.Task, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Problem;
}