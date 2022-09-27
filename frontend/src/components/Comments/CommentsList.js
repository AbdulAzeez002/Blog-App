import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import EditComment from "../../components/Modal/EditComment";

export default function CommentsList({ comments }) {
   const dispatch=useDispatch()
   const [open, setOpen] = useState(false)
   const [editId,setEditId]=useState("")
   const [editValue,setEditValue]=useState("")
   const editComment=(id,description)=>{
    setOpen(true)
    setEditId(id)
    setEditValue(description)
   }

  return (
    <div className="flex justify-center ">
      <ul className="divide-y bg-gray-700 w-full mx-6 md:mx-0 md:w-2/5 divide-gray-200 p-3 mt-5 overflow-hidden hover:overflow-y-scroll  max-h-[500px]">
        <div className="text-gray-400">{comments?.length}  Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-yellow-400 text-lg text-center">No comments</h1>
          ) : (
            comments?.map(comment => (
              <>
                <li key={comment?._id} className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white">
                          {comment?.user?.firstName} {comment?.user?.lastName}
                        </h3>
                        <p className="text-bold text-yellow-500 text-base ml-5">
                          {/* <Moment fromNow ago>
                      {comment?.createdAt}
                    </Moment> */}

                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}

                      <p class="flex">
                        <button class="p-3" onClick={()=>editComment(comment?._id,comment?.description)}>
                          <PencilAltIcon class="h-5 mt-3 text-yellow-300" />
                        </button>
                        <button class="ml-3" onClick={()=>dispatch(deleteCommentAction(comment?._id))}>
                          <TrashIcon class="h-5 mt-3 text-red-600" />
                        </button>
                      </p>
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
      <div>
        <EditComment open={open} setOpen={setOpen} commentId={editId} value={editValue} />
      </div>
    </div>
    

    
  );
}
