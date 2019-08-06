var db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Task.findAll({
            where: {
                ProjectId: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    },
    create: function (req, res) {
        console.log("this is the req server side",req)
        db.Task.create({
            task: req.body.task,
            deadline: req.body.deadline,
            ProjectId: req.body.ProjectId
        }).then(function (newTask) {
            console.log(newTask)
        })
    },
    update: function (req, res) {
        db.Task.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    },
    remove: function (req, res) {
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    },
};