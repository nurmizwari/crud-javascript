const Controller = require("../controller");
const router = require("express").Router();

router.get("/", Controller.home);
router.get("/arts/add", Controller.new);
router.post("/arts/add", Controller.create);
router.get("/arts/:id", Controller.detail);
router.post("/arts/:id/edit", Controller.update);
router.get("/arts/:id/delete", Controller.delete);
module.exports = router;
