const sales = require("../controller/sales.controller.js");
var router = require("express").Router();

router.post("/", sales.create);
router.get("/", sales.findAll);
router.get("/:id", sales.findOne);
router.put("/:id", sales.update);

module.exports = router;