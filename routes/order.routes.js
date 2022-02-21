const sales = require("../controller/order.controller.js");
var router = require("express").Router();

router.post("/", sales.create);
router.post("/detailed", sales.createDetailedOrder);
router.get("/", sales.findAll);
router.get("/:id", sales.findOne);
// router.get("/detailed", sales.findOneDetailed);
router.put("/:id", sales.update);
router.patch("/:id",sales.logicDelete)


module.exports = router;