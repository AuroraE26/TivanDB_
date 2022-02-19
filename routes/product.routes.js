const products = require("../controller/product.controller.js");
var router = require("express").Router();

    router.post("/", products.create);
    router.get("/", products.findAll);
    router.get("/:id", products.findOne);
    router.put("/:id", products.update);



  module.exports =router;