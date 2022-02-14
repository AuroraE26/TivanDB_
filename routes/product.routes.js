
const products = require("../controller/product.controller.js");
const sales = require("../controller/sales.controller.js");
var router = require("express").Router();

    router.post("/productos/", products.create);
    router.get("/productos/", products.findAll);
    router.get("/productos/:id", products.findOne);
    router.put("/productos/:id", products.update);
    router.delete("/productos/:id", products.delete);

    router.post("/sales/", sales.create);
    router.get("/sales/", sales.findAll);
    router.get("/sales/:id", sales.findOne);
    router.put("/sales/:id", sales.update);

  module.exports =router;