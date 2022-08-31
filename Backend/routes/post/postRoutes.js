const express = require("express");
const { toggleAddDislikeToPostCtrl,toggleAddLikeToPostCtrl,createPostCtrl,fetchAllPosts,fetchSinglePostCtrl,updatePostCtrl,deletePostCtrl } = require("../../controllers/posts/postCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");
const {
    PhotoUpload,
    postImgResize,
  } = require("../../middlewares/uploads/photoUpload");

const postRoutes = express.Router();

postRoutes.post(
    "/",
    authMiddleware,
    PhotoUpload.single("image"),
    postImgResize,
    createPostCtrl
  );
  postRoutes.put("/likes", authMiddleware, toggleAddLikeToPostCtrl);
  postRoutes.put("/dislikes", authMiddleware, toggleAddDislikeToPostCtrl);

  postRoutes.get('/',fetchAllPosts)
  postRoutes.get("/:id", fetchSinglePostCtrl);
  postRoutes.put("/:id", authMiddleware, updatePostCtrl);
  postRoutes.delete("/:id", authMiddleware, deletePostCtrl);

  
module.exports = postRoutes;