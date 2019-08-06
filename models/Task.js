const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: true
        },
        assignee1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        assignee2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        assignee3: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        assignee4: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Task.associate = function (models) {

        Task.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return Task;
}