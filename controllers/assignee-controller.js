var db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Assignee.findAll({
            where: {
                ProjectId: req.params.id
            }
        }).then(function (dbAssignee) {
            res.json(dbAssignee);
        });
    },
    create: function (req, res) {
        db.Assignee.create({
            name: req.body.name,
            ProjectId: req.body.ProjectId
        }).then(function (newAssignee) {
            console.log(newAssignee)
        })
    },
    update: function (req, res) {
        db.Assignee.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (dbAssignee) {
            res.json(dbAssignee);
        });
    },
    remove: function (req, res) {
        db.Assignee.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbAssignee) {
            res.json(dbAssignee);
        });
    }
};