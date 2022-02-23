const details = require("../controller/orderDetail.controller");
var router = require("express").Router();

router.post("/", details.create);
router.get("/", details.findAll);
router.get("/:id", details.findOne);
router.put("/:id", details.update);

module.exports =router;