const router = require("express").Router();
const task = require("../../controllers/task-controller");

// =====================================
//     /api/task   =====================
// =====================================
router.route("/")
  .post(task.create);

router.route("/:id")
    .get(task.findAll)
    .put(task.update)
    .delete(task.remove);

router.route("/:id/incomplete")
    .get(task.findAllIncomplete)
  
module.exports = router;