var db = require("../models");

module.exports = {
    findOne: function (req, res) {
        db.Deadline.findOne({
            where: {
                ProjectId: req.params.id
            }
        }).then(function (dbDeadline) {
            res.json(dbDeadline);
        });
    },
    create: function (req, res) {
        db.Deadline.create({
            deadline: req.body.deadline,
            ProjectId: req.body.ProjectId
        }).then(function (newDeadline) {
            res.json(newDeadline);
        })
    },
    update: function (req, res) {
        db.Deadline.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (dbDeadline) {
            res.json(dbDeadline);
        });
    }
};