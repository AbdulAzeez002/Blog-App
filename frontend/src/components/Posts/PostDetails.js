import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { fetchPostDetailsAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from 'react-router-dom'
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";

export default function PostDetails() {
  const { id }=useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, []);

  //select post details from store

  const post = useSelector(state => state?.post);

  const { postDetails, loading, appErr, serverErr } = post;
  return (
    <>
      {(
        <section className="pb-32 bg-white overflow-hidden">
          <div className=" px-4 mx-auto">
            {/* Post Image */}
            <div className="flex items-center justify-center mt-24">
            <img
              className=" h-80 w-80  object-cover border border-black"
              src={postDetails?.image}
              alt=""
            />
            </div>
            
            <div className="max-w-2xl mx-auto text-center">
              <h2 className=" text-4xl 2xl:text-6xl text-gray-500 font-bold  mt-5">
                {postDetails?.title}
              </h2>

              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-13 h-20 lg:h-13 rounded-full"
                  src={postDetails?.user?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-2xl font-bold text-gray-50">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gray-500">
                      {postDetails?.user?.firstName}{" "}
                      {postDetails?.user?.lastName}{" "}
                    </span>
                  </h4>
                  <p className="text-rose-700">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div class="max-w-xl mx-auto flex items-center justify-center" dangerouslySetInnerHTML={{ __html: postDetails?.description}}>
                
                  </div>

                  <div className="flex items-center justify-center mb-10">
                        {/* Show delete and update btn if created user */}
                  <p class="flex">
                    <Link class="p-3" to={`/update-post/${postDetails?._id}`}>
                      <PencilAltIcon class="h-8 mt-3 text-yellow-300" />
                    </Link>
                    <button class="ml-3">
                      <TrashIcon class="h-8 mt-3 text-red-600" />
                    </button>
                  </p>
                  </div>
                  
                
              
            </div>
          </div>
          {/* Add comment Form component here */}

          <div className="flex justify-center  items-center">
            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
            CommentsList
          </div>
        </section>
      )}
    </>
  );
};


