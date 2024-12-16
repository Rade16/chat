const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
router.post(
  "/registration",
  check("username")
    .isLength({ min: 2, max: 25 })
    .withMessage("Имя должно быть не менее 2 символов и не более 25"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен быть не менее 6 символов"),
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);
router.get("/auth", authMiddleware, controller.auth);
router.get("/find-users", controller.findUsers);
router.put("/update-user/:id", upload.single("avatar"), controller.updateUser);

module.exports = router;
