import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { blockUserAction,unBlockUserAction } from "../../../redux/slices/users/usersSlices";


const UsersListItem = user => {
  const dispatch=useDispatch()
  return (
    <>
      <div className="p-8 mx-10 mb-4 bg-white shadow-xl rounded border border-black">
        <div className="flex flex-wrap justify-between items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">{user?.user?.firstName} {user?.user?.lastName}</p>
              <p className="text-xs text-gray-500">{user?.user?.email}</p>
            </div>
          </div>
          
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded">
              <span className="text-base mr-2  boder-2 text-bold text-black">
                {user.user?.posts?.length} - Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?.user?._id}`}
              className=" text-white  inline-block py-1 px-2 bg-emerald-700 text-center mr-2 mb-1 lg:mb-0 text-lg border-2  rounded  hover:text-rose-800"
            >
              Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
                className="inline-block py-1 px-4 text-center bg-gray-500 text-white mr-2 mb-1 lg:mb-0 text-lg border rounded"
              >
                unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className="inline-block py-1 px-4 text-center bg-rose-700 text-white mr-2 mb-1 lg:mb-0 text-lg border rounded"
              >
                Block
              </button>
            )}

            
          </div>
          
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
