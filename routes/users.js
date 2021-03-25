const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserById,
  updateProfile,
  changePassword,
  registerOfficer,
  getOfficer,
  deleteOfficer,
  updateOfficer,
  changePasswordOfficer,
} = require("../controllers/userController");
const { isLogin, isAdmin } = require("../middlewares/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/profile", isLogin, getUserById);
router.put("/profile", isLogin, updateProfile);
router.patch("/change-password", isLogin, changePassword);
router.patch(
  "/change-password-officer/:_id",
  isLogin,
  isAdmin,
  changePasswordOfficer
);
router.post("/register", register);
router.post("/register-officer", registerOfficer, isLogin, isAdmin);
router.get("/officer/:pageSize/:currentPage", isLogin, isAdmin, getOfficer);
router.delete("/officer/:_id", isLogin, isAdmin, deleteOfficer);
router.put("/officer/:_id", isLogin, isAdmin, updateOfficer);
router.post("/login", login);

module.exports = router;
