const details = require("../controller/detalleOrden.controller.js");
var router = require("express").Router();

router.post("/", details.create);
router.get("/", details.findAll);
router.get("/:id", details.findOne);
router.put("/:id", details.update);

module.exports =router;