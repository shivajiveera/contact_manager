const { application } = require("express");
const exprss = require("express");
const {
  register,
  login,
  getMe,
} = require("../../Controllers/userAuthControllers/userAuthControllers");
const { protect } = require("../../middleware/userAuthMiddleware");
const router = exprss.Router();

router.post("/signup", register);

router.post("/login", login);

router.get("/me", protect, getMe);

module.exports = router;
