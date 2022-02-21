const products = require("../controller/product.controller.js");
var router = require("express").Router();

const upload = require("../lib/common");

    router.post("/", products.create);
    router.get("/", products.findAll);
    router.get("/:id", products.findOne);
    router.put("/:id", products.update);
    router.patch("/:id",products.logicDelete);
    router.patch("/:id/favorito",products.favorite);
    router.patch("/:id/piece",products.pieces);
    
    router.post("/uploadImage",upload.single("image"), products.uploadImage);

  module.exports =router;