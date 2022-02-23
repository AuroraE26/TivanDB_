const products = require("../controller/product.controller.js");
const upload = require("../lib/s3");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, products.create);
router.get("/", products.findAll);
router.get("/:id", products.findOne);
router.put("/:id", products.update);
router.patch("/:id", products.logicDelete);
router.patch("/:id/favorito", products.favorite);
router.patch("/:id/piece", products.pieces);

router.post("/uploadImage", upload.single("image"), products.uploadImage);
router.post("/suply", products.suply);

module.exports = router;
