const router = require("express").Router();
const { check } = require("express-validator");
const { login, register } = require("../controller/auth.controller.js");
const { validateFields } = require("../middleware/validateFields.js");

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
  [
    check("email", "No mailing structure").isEmail(),
    check("password", "The password must not be empty").not().isEmpty(),
    check("password", "The password must be at least 6 digits long").isLength({
      min: 6,
    }),
    validateFields,
  ],
  register
);

module.exports = router;
