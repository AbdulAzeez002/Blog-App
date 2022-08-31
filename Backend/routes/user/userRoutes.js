const express = require("express");
const { profilePhotoUploadCtrl,followingUserCtrl,userRegister,loginUser,fetchUsers,generateOtp,deleteUser ,fetchUserDetail,updateUserCtrl,updateUserPasswordCtrl,userProfileCtrl} = require("../../controllers/user/userController");
const authMiddleware = require("../../middlewares/authMiddleware");
const otpMiddleware=require("../../middlewares/otpMiddleware");
const { PhotoUpload,profilePhotoResize } = require("../../middlewares/uploads/photoUpload");
const userRoutes = express.Router();

userRoutes.post("/register",otpMiddleware,userRegister);
userRoutes.post("/login", loginUser);
userRoutes.get("/", fetchUsers);
userRoutes.put( "/profilephoto-upload",authMiddleware,PhotoUpload.single("image"),profilePhotoResize,profilePhotoUploadCtrl
  );

userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/:id", authMiddleware, updateUserCtrl);
userRoutes.put("/follow",authMiddleware, followingUserCtrl);
userRoutes.delete("/:id",authMiddleware, deleteUser);
userRoutes.get("/:id",authMiddleware, fetchUserDetail);
userRoutes.post("/otpGenerate",generateOtp);











module.exports = userRoutes;