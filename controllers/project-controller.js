var db = require("../models");

module.exports = {
    findAll: function (req, res) {
        var userID = req.session.passport.user;
        db.Project.findAll({
            where: {
                UserUuid: userID
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    },
    findOne: function (req, res) {
        db.Project.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    },
    create: function (req, res) {
        var userID = req.session.passport.user;
        // console.log(req.body)
        db.Project.create({
            name: req.body.name,
            UserUuid: userID
        }).then(function (newProject) {
            res.json(newProject)
        })
    },
    remove: function (req, res) {
        db.Project.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    },
    update: function (req, res) {
        db.Project.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    }
};