
const products = require("../controller/product.controller.js");
const sales = require("../controller/sales.controller.js");
const details = require("../controller/detalleOrden.controller.js");
var router = require("express").Router();

    router.post("/productos/", products.create);
    router.get("/productos/", products.findAll);
    router.get("/productos/:id", products.findOne);
    router.put("/productos/:id", products.update);

    router.post("/sales/", sales.create);
    router.get("/sales/", sales.findAll);
    router.get("/sales/:id", sales.findOne);
    router.put("/sales/:id", sales.update);

    router.post("/details/", details.create);
    router.get("/details/", details.findAll);
    router.get("/details/:id", details.findOne);
    router.put("/details/:id", details.update);

  module.exports =router;