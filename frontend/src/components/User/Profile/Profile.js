import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import { userProfileAction,followUserAction,unfollowUserAction } from "../../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../../utils/DateFormatter";

export default function Profile() {
 const {id}=useParams()
  const dispatch = useDispatch();
  

  //User data from store
  const users = useSelector(state => state.users);
  

  const {
    profile,
    profileLoading,
    profileAppErr,
    profileServerErr,
    followed,
    unFollowed,
    userAuth
  } = users;

  //fetch user profile
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unFollowed]);

  //isLogin

  const isLoginUser = userAuth?._id === profile?._id;

  return (
    <>
      <div className=" flex overflow-hidden bg-white mt-20">
        {/* Static sidebar for desktop */}

        <div className="flex flex-col min-w-0 flex-1 overflow-hidden mt-10">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    {/* <img
                      className="h-32 w-full object-cover lg:h-48"
                      src={profile?.profilePhoto}
                      alt={profile?.firstName}
                    /> */}
                  </div>
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex -mt-20">
                        <img
                          className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile?.profilePhoto}
                          alt={profile?.firstName}
                        />
                      </div>
                      <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 ">
                            {profile?.firstName} {profile?.lastName}
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              {/* {profile?.accountType} */}
                            </span>
                            {/* Display if verified or not */}
                            {/* {profile?.isAccountVerified ? (
                              <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                Account Verified
                              </span>
                            ) : (
                              <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                                Unverified Account
                              </span>
                            )} */}
                          </h1>
                          <p className="m-3 text-lg"><span className="font-bold text-rose-700"> Date Joined:</span>
                           
                            <DateFormatter date={profile?.createdAt} />{" "}
                          </p>
                          <p className="text-green-600 mt-2 mb-2">
                            {profile?.posts?.length} posts{" "}
                            {profile?.followers?.length} followers{" "}
                            {profile?.following?.length} following
                          </p>
                          {/* Who view my profile */}
                          {/* <div className="flex items-center  mb-2">
                            <EyeIcon className="h-5 w-5 " />
                            <div className="pl-2">
                              {profile?.viewedBy?.length}{" "}
                              <span className="text-indigo-400 cursor-pointer hover:underline">
                                users viewed your profile
                              </span>
                            </div>
                          </div> */}

                          {/* is login user */}
                          {/* Upload profile photo */}
                          <Link
                            to={`/upload-profile-photo`}
                            className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            <UploadIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Upload Photo</span>
                          </Link>
                        </div>

                        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          {/* // Hide follow button from the same */}
                          {!isLoginUser && (
                                <div>
                                  {profile?.isFollowing ? (
                                    <button
                                      onClick={() =>
                                        dispatch(unfollowUserAction(id))
                                      }
                                      className="mr-2 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                      <EmojiSadIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span>Unfollow</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        dispatch(followUserAction(id))
                                      }
                                      type="button"
                                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                      <HeartIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span>Follow </span>
                                      <span className="pl-2">
                                        {profile?.followers?.length}
                                      </span>
                                    </button>
                                  )}

                                  <></>
                                </div>
                              )}

                          {/* Update Profile */}

                          <>
                            <Link
                              to={`/update-profile/${profile?._id}`}
                              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <UserIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Update Profile</span>
                            </Link>
                          </>
                          
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {profile?.firstName} {profile?.lastName}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-red-900">
                    <div className="max-w-5xl mx-auto "></div>
                  </div>
                </div>
                <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
                  {/* <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                    <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                      Your followers
                    </h1>

                    <ul className="">
                      <div>
                        <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                          <img
                            className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                            // src={user.profilePhoto}
                            // alt={user?._id}
                          />
                          <div className="font-medium text-lg leading-6 space-y-1">
                            <h3>
                              Name
                            </h3>
                            <p className="text-indigo-600">
                               Account Type
                            </p>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div> */}
                  {/* All my Post */}
                  <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                    <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                      My Post - {profile?.posts?.length}
                    </h1>
                    {/* Loop here */}
                    {profile?.posts?.length <= 0 ? (
                      <h2 className="text-center text-xl">No Post Found</h2>
                    ) : (
                      profile?.posts?.map(post => (
                        <div className="flex flex-wrap  -mx-3 mt-3  lg:mb-6">
                          <div className="mb-2   w-full lg:w-1/4 px-3">
                            <div>
                              <img
                                className="object-cover h-40 rounded"
                                src={post?.image}
                                alt="poster"
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-3/4 px-3">
                            <Link
                              to={`/posts/${post?._id}`}
                              className="hover:underline"
                            >
                              <h3 className="mb-1 text-2xl text-green-600 font-bold font-heading">
                                {post?.title}
                              </h3>
                            </Link>
                            
                            <div style={{overflow: "hidden", textOverflow: "ellipsis",height:'50px' }} class="text-black" dangerouslySetInnerHTML={{ __html: post?.description }}>
                          
                        </div>

                            <Link
                              className="text-indigo-500 hover:underline"
                              to={`/posts/${post?._id}`}
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
