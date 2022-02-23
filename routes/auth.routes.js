const router = require("express").Router();
const { check } = require("express-validator");
const { login, register } = require("../controller/auth.controller.js");

router.get("/", (req, res) => {
  res.json({
    Api: "Tivan",
    version: "0.2.1",
    developersBack: [
      {
        name: "Aurora Escalera",
        git: "@AuroraE26",
      },
      {
        name: "Jairo Rocano",
        git: "@Ftnt",
      },
    ],
    developersFront: [
      {
        name: "Elfego Aguilar",
        git: "@EXIDEOR",
      },
      {
        name: "Odon Lozada",
        git: "@OdonML",
      },
    ],
  });
});
router.post("/login", login);
router.post(
  "/register",
  check("email", "No mailing structure").isEmail(),
  register
);

module.exports = router;
