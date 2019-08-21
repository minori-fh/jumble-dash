const router = require("express").Router();
const deadline = require("../../controllers/deadline-controller");

// =====================================
//     /api/task   =====================
// =====================================
router.route("/")
  .post(deadline.create)

router.route("/:id")
    .get(deadline.findOne)
    .put(task.update)
  
module.exports = router;