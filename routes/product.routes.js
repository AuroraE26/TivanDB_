const productos = require("../controller/product.controller.js");
var router = require("express").Router();

router.post("/", productos.create);
router.get("/", productos.findAll);
router.get("/:id", productos.findOne);
router.put("/:id", productos.update);
router.patch("/:id", productos.logicDelete);
router.delete("/:id", productos.delete);

module.exports = router;
