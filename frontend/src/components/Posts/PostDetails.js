import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { deletePostAction, fetchPostDetailsAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from 'react-router-dom'
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import {Navigate} from 'react-router-dom'
import ConfirmBox from "react-dialog-confirm";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";

export default function PostDetails() {
  const [editor,setEditor]=useState(false)
  const { id }=useParams();

  //comment
  const comment = useSelector(state => state.comment);
  const { commentCreated,commentDeleted,commentUpdated } = comment;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id,dispatch,commentCreated,commentDeleted,commentUpdated ]);

  //select post details from store

  const post = useSelector(state => state?.post);
  const user=useSelector(state=>state?.users)

  const { postDetails, loading, appErr, serverErr,isDeleted } = post;
  const{userAuth}=user

  if(isDeleted){
    return <Navigate to="/posts"/>
  }

  const isCreatedBy=(postDetails?.user?._id ===userAuth?._id) || (userAuth?.isAdmin===true) 
  const isEditor=postDetails?.user?._id ===userAuth?._id
  
  
  return (
    <>
      {(
        <section className="pb-32 bg-white overflow-hidden">
          <div className=" px-4 ">
            {/* Post Image */}
            <div className="flex items-center justify-center mt-24">
            <img
              className=" h-80 w-80  object-cover border border-black"
              src={postDetails?.image}
              alt=""
            />
            </div>
            
            <div className="mx-5">
              <div className="flex justify-center flex-col items-center ">
              <h2 className=" text-4xl 2xl:text-4xl text-cyan-700 font-bold  mt-5 ">
                {postDetails?.title}
              </h2>
              <p className="pt-2 text-xl text-gray-400"><span className="text-gray-600 font-bold"> Category: </span>{postDetails?.category}</p>
              {
                postDetails?.category==='Others' ? <p className=" text-xl text-gray-400 "><span className="text-gray-600 font-bold"> Sub-Category: </span>{postDetails?.subCategory}</p>:null
              }
              {/* User */}
              <div className="inline-flex pt-4 mb-14 items-center  border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-12 h-20 lg:h-12 rounded-full"
                  src={postDetails?.user?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-xl font-bold text-gray-50 pt-6">
                    <span className="text-xl lg:text-xl font-bold text-transparent bg-clip-text bg-gray-500">
                      {postDetails?.user?.firstName}{" "}
                      {postDetails?.user?.lastName}{" "}
                    </span>
                  </h4>
                  <p className="text-rose-700">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                </div>
              </div>
              </div>
             
              {/* Post description */}
              <div class=" md:mx-24 " dangerouslySetInnerHTML={{ __html: postDetails?.description}}>
                
                  </div>
                  {
                    isCreatedBy ? (<div className="flex items-center justify-center mb-10">
                    {/* Show delete and update btn if created user */}
              <p class="flex">
                {
                  isEditor?<Link class="p-3" to={`/update-post/${postDetails?._id}`}>
                  <PencilAltIcon class="h-8 mt-3 text-yellow-300" />
                </Link>:null
                }
                
                <button onClick={()=>dispatch(deletePostAction(postDetails?._id))} class="ml-3">
                  <TrashIcon class="h-8 mt-3 text-red-600" />
                </button>
              </p>
              </div>) : null
                  }
                  
                  
                
              
            </div>
          </div>
          <hr className="mt-10 text-gray-800 mx-10"/>
          {
            userAuth ? <div className="mt-10 w-full" >
            <AddComment postId={id} />
            </div> :null
          }
          
          {/* Add comment Form component here */}
         
          <div className="mt-2">
            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
            <CommentsList comments={postDetails?.comments}/>
          </div>
        </section>
      )}
    </>
  );
};