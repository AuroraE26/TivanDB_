const sales = require("../controller/order.controller.js");
var router = require("express").Router();

router.post("/", sales.create);
router.post("/detailed", sales.createDetailedOrder);
router.get("/", sales.findAll);
router.get("/:id", sales.findOne);
router.put("/:id", sales.update);


module.exports =router;