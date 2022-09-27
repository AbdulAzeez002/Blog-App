const User = require("../../models/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const validateMongodbId = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs = require("fs");
require('dotenv').config();
const ServiceSID = process.env.ServiceSID;
const AccountSID = process.env.AccountSID;
const authToken = process.env.authToken
const client = require('twilio')(AccountSID, authToken)





const generateOtp=expressAsyncHandler(async(req,res)=>{

  console.log('reached otp');
   //Check if user Exist
   const {email,mobile}=req.body.userData
   console.log(email,mobile);
   
   const userExists = await User.findOne({ email: email});
   if (userExists){
    throw new Error("User already exists");
   } 
  

   try {
    client.verify
    .services(ServiceSID)
    .verifications.create({
      to: `+91${mobile}`,
      channel: "sms"

    })

    res.json({status:true})  
   

   } catch (error) {
      res.json({status:false})
   }
})


//-------------------------------------
//Register
//-------------------------------------



  const userRegister = expressAsyncHandler(async (req, res) => {
    console.log('uhhhjjj');
    //Check if user Exist
    const userExists = await User.findOne({ email: req?.body?.email });
  
    if (userExists) throw new Error("User already exists");
    try {
      //Register user
      const user = await User.create({
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        password: req?.body?.password,
        mobile: req?.body?.mobile,
        
      });
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  });
    

 

//-------------------------------
//Login user
//-------------------------------

const loginUser = expressAsyncHandler(async (req, res) => {
  
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email });
    //check if blocked
    // if (userFound?.isBlocked)
    //   throw new Error("Access Denied You have been blocked");
    if (userFound && (await userFound.isPasswordMatched(password))) {
      //Check if password is match
      res.json({
        _id: userFound?._id,
        firstName: userFound?.firstName,
        lastName: userFound?.lastName,
        email: userFound?.email,
        profilePhoto: userFound?.profilePhoto,
        isAdmin: userFound?.isAdmin,
        token: generateToken(userFound?._id),
        isVerified: userFound?.isAccountVerified,
      }); 
    } else {
      res.status(401)
      throw new Error("Invalid Login Credentials");
    }
  });

  //------------------------------
//Users
//-------------------------------
const fetchUsers = expressAsyncHandler(async (req, res) => {
    
    try {
      const users = await User.find({}).populate('posts')
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  });

  //------------------------------
//Delete user
//------------------------------
const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    //check if user id is valid
    validateMongodbId(id);
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      res.json(deletedUser);
    } catch (error) {
      res.json(error);
    }
  });

  //----------------
//user details
//----------------
const fetchUserDetail = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    //check if user id is valid
    validateMongodbId(id);
    try {
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  });





//------------------------------
//User profile
//------------------------------
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  //1.Find the login user
  //2. Check this particular if the login user exists in the array of viewedBy

  //Get the login user
  const loginUserId = req?.user?._id?.toString();
  console.log(typeof loginUserId);
  try {
    const myProfile = await User.findById(id)
      .populate("posts")
      .populate("viewedBy");
    const alreadyViewed = myProfile?.viewedBy?.find(user => {
      console.log(user);
      return user?._id?.toString() === loginUserId;
    });
    if (alreadyViewed) {
      res.json(myProfile);
    } else {
      const profile = await User.findByIdAndUpdate(myProfile?._id, {
        $push: { viewedBy: loginUserId },
      });
      res.json(profile);
    }
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Update profile
//------------------------------
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//------------------------------
//Update password
//------------------------------

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    
    res.json(user);
  }
});


 //------------------------------
//following
//------------------------------

const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  //1.Find the user you want to follow and update it's followers field
  //2. Update the login user following field
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //find the target user and check if the login id exist
  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    user => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("You have already followed this user");

  //1. Find the user you want to follow and update it's followers field
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  //2. Update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );
  res.json("You have successfully followed this user");
});

//------------------------------
//unfollow
//------------------------------

const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("You have successfully unfollowed this user");
});


  //------------------------------
//Profile photo upload
//------------------------------

const profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
 //Find the login user
 const { _id } = req.user;

 //1. Get the path to img
 const localPath = `public/images/profile/${req.file.filename}`;
 //2.Upload to cloudinary
 const imgUploaded = await cloudinaryUploadImg(localPath);

 const foundUser = await User.findByIdAndUpdate(
   _id,
   {
     profilePhoto: imgUploaded?.url,
   },
   { new: true }
 );
 //remove the saved img
 fs.unlinkSync(localPath);
 res.json(foundUser);
});

//------------------------------
//Block user
//------------------------------

const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
});

//------------------------------
//UnBlock user
//------------------------------

const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
});


module.exports = {blockUserCtrl,unBlockUserCtrl,followingUserCtrl,unfollowUserCtrl, generateOtp,userRegister,loginUser,fetchUsers,deleteUser,fetchUserDetail,userProfileCtrl,
  updateUserCtrl,updateUserPasswordCtrl,profilePhotoUploadCtrl};