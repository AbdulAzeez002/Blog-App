const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const Post = require("../../models/post/post");
const fs = require("fs");
const validateMongodbId = require("../../utils/validateMongodbID");
const User = require("../../models/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");


const createPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.body)
  console.log('reached post create');
  // console.log(req.file); 
  const { _id } = req.user;
  console.log(_id);
    // validateMongodbId(req.body.user);
  //Check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  //Block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }

  //1. Get the oath to img
  const localPath = `public/images/posts/${req.file.filename}`;
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    console.log(req.body,'posts')
    const post = await Post.create({

      ...req.body,
      image: imgUploaded?.url,
      user: _id,
    });
    res.json(post);
    //Remove uploaded img
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------
//Fetch all posts
//-------------------------------
const fetchAllPosts = expressAsyncHandler(async (req, res) => {
 
  const hasCategory=req?.query?.category
  console.log(hasCategory)
 
  try {
 
    // check it has category
    if(hasCategory!='undefined' && hasCategory!='ALL CATAGORIES' && hasCategory!=undefined){
      console.log('has')
      const posts = await Post.find({category:hasCategory}).populate("user").populate("comments").sort('-createdAt');
      console.log(posts)
      res.json(posts);
    }
    
    else{
      
      const posts = await Post.find({}).populate("user").populate("comments").sort('-createdAt');
      res.json(posts);
    }
    
  } catch (error) {
    res.json(error)
  }
});

//------------------------------
//Fetch a single post
//------------------------------

const fetchSinglePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id).populate("user").populate('comments');
    //update number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
// Update post
//------------------------------

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//Delete Post
//------------------------------

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  console.log('delted')
  const { id } = req.params;
  console.log(id)
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndDelete(id);
    console.log(post)
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Likes
//------------------------------

const toggleAddLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log('reahed like')
  //1.Find the post to be liked
  const { postId } = req.body;

  const post = await Post.findById(postId);

  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this post?
  const isLiked = post?.isLiked;
  //4.Chech if this user has dislikes this post
  const alreadyDisliked = post?.disLikes?.find(
    userId => userId?.toString() === loginUserId?.toString()
  );

  console.log(alreadyDisliked)
  console.log('disliked already');
  //5.remove the user from dislikes array if exists
  if (alreadyDisliked) {
    console.log('dis');
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    // res.json(post);
  }
  //Toggle
  //Remove the user if he has liked the post
  if (isLiked) {
    console.log('remove from like');
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    console.log('add like')
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});


//------------------------------
//disLikes
//------------------------------

const toggleAddDislikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log('reached disliked');
  //1.Find the post to be disLiked
  const { postId } = req.body;
  console.log('podtid');
  const post = await Post.findById(postId);
  //2.Find the login user
  const loginUserId = req?.user?._id;
  console.log('userId');
  //3.Check if this user has already disLikes
  const isDisLiked = post?.isDisLiked;
  console.log(isDisLiked);
  //4. Check if already like this post
  const alreadyLiked = post?.likes?.find(
    userId => userId.toString() === loginUserId?.toString()
  );

  console.log(alreadyLiked);
  
  //Remove this user from likes array if it exists
  if (alreadyLiked) {
    console.log('alredy liked')
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    // res.json(post);
  }
  //Toggling
  //Remove this user from dislikes if already disliked
  if (isDisLiked) {
    console.log('remove from like')
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    console.log('asd to dislimke');
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});



module.exports = {toggleAddDislikeToPostCtrl, toggleAddLikeToPostCtrl,createPostCtrl,updatePostCtrl,deletePostCtrl,fetchAllPosts,fetchSinglePostCtrl };
