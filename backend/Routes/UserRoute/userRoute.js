const express = require("express");
const router = express.Router();
const {
  getUser,
  getSingleUser,
  setUser,
  updateUser,
  deleteUser,
} = require("../../Controllers/UserControllers/userControllers");
const { protect } = require("../../middleware/userAuthMiddleware");

router.route("/").get(protect, getUser).post(protect, setUser);
router
  .route("/:id")
  .get(protect, getSingleUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
