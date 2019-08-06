const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Assignee = sequelize.define("Assignee", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        task1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        task2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        task3: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        task4: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    });

    Assignee.associate = function (models) {

        Assignee.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Assignee;
}