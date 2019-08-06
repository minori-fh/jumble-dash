const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define("Budget", {
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Marketing: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        HR: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Design: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Engineering: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Sales: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Finance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Security: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
            timestamps: false
        });

    Budget.associate = function (models) {

        Budget.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Budget;
}