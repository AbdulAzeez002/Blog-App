
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPostsAction, toggleAddLikesToPost, toggleAddDisLikesToPost, } from "../../redux/slices/posts/postSlices";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import Pagination from "./Pagination";
import  DOMPurify from 'dompurify';
import { useEffect, useState } from "react";




export default function PostsList() {

   //select post from store
   const post = useSelector(state => state?.post);
   const user=useSelector(state=>state?.users)
   const {userAuth}=user
   const[categoryName,setCategoryName]=useState('')
   const sanitizedData = (data) => ({ __html: DOMPurify.sanitize(data) })
   const { postLists, loading, appErr, serverErr, likes, dislikes } = post;
   

   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage, setPostsPerPage] = useState(2);
   const [data,setData]=useState([])
   const [all,setAll]=useState([])


   const lastPostIndex = currentPage * postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;

   

 
  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, []);


  const categorySelected=(title)=>{
    dispatch(fetchPostsAction(title))
    setCategoryName(title)
  }

  useEffect(()=>{
    if(!categoryName){
      dispatch(fetchPostsAction())
    }
    else{
      dispatch(fetchPostsAction(categoryName))
    }
    // else{
    //   dispatch(fetchPostsAction(categoryName)
    // }
  },[categoryName,likes,dislikes])

  //fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);


  useEffect(() => {
    if(postLists){
       setAll(postLists)
      const currentPosts = postLists.slice(firstPostIndex, lastPostIndex);
      setData(currentPosts)
    }
  }, [postLists,currentPage]);

 
  //select categories from store
  const category = useSelector(state => state?.category);
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;

  return (
    <>
      <section>
      <div class="py-20 bg-[#F1F5F9] min-h-screen radius-for-skewed mt-10">
          <div class="containehow r mx-auto px-4">
            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2 lg:fixed ml-4 ">
              <span class="text-gray-600 text-2xl font-bold ">
                  See Posts From Our <br></br> Awesome Authors
                </span>
                {/* <h2 class="text-4xl text-black lg:text-5xl font-bold font-heading ">
                  Latest Post
                </h2> */}
              </div>
              
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3 lg:fixed ">
                <div class="py-4 px-6 bg-gray-200 shadow rounded lg:overflow-hidden lg:hover:overflow-y-scroll  lg:max-h-[500px]">
                  <h4 class="mb-4 text-black font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    <li>
                      <p onClick={() =>categorySelected()}  className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-500">All Categories</p>
                    </li>
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1>No Category Found</h1>
                    ) : (
                      
                      categoryList?.map(category => (
                        <li>
                          <p onClick={() => categorySelected(category.title)}  className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-500">
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:ml-[25%] lg:w-3/4 px-3">
                {/* Post goes here */}

                {appErr || serverErr ? (
                  <p className="mt-2 text-center text-lg text-red-600">
                    {serverErr} {appErr}
                  </p>
                ) : postLists?.length <= 0 ? (<div class="flex justify-center "><h1 className="text-red-700 py-20 text-2xl"> There are no posts in this category</h1></div>
                  
                  
                ) : (
                  postLists && postLists?.map((post, index) => (
                    <div class="flex flex-wrap shadow-xl bg-[#F1F5F9]  lg:mb-6 border border-gray-400 rounded-xl mr-10 p-10">
                      <div class="mb-10  w-full lg:w-1/4 px-3">
                        <Link to={`/posts/${post?._id}`}>
                          {/* Post image */}
                          <img
                            class="w-full h-full object-cover rounded"
                            src={post?.image}
                            alt=""
                          />
                        </Link>
                        {/* Likes, views dislikes */}
                      {
                        userAuth?<div className="flex flex-row bg-gray-300 justify-center w-full  items-center mt-2">
                        {/* Likes */}
                        <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                          {/* Togle like  */}
                          <div className="">
                            <ThumbUpIcon onClick={() => dispatch(toggleAddLikesToPost(post?._id))} className="h-7 w-7 text-gray-600 cursor-pointer" />
                          </div>
                          <div className="pl-2 text-gray-600">
                            {post?.likes?.length ? post?.likes?.length : 0}
                          </div>
                        </div>
                        {/* Dislike */}
                        <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                          <div>
                            <ThumbDownIcon onClick={() => dispatch(toggleAddDisLikesToPost(post?._id))} className="h-7 w-7 cursor-pointer text-gray-600" />
                          </div>
                          <div className="pl-2 text-gray-600">
                            {post?.disLikes?.length
                              ? post?.disLikes?.length
                              : 0}
                          </div>
                        </div>
                        {/* Views */}
                        <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                          <div>
                            <EyeIcon className="h-7 w-7  text-gray-400" />
                          </div>
                          <div className="pl-2 text-gray-600">
                            {post?.numViews}
                          </div>
                        </div>
                      </div> :null
                      }

                        

                      </div>
                      <div class="w-full lg:w-3/4 px-3 mt-10 lg:mt-0 ">
                        <Link to={`/posts/${post?._id}`} class=" hover:underline">
                          <h3 class="mb-1 text-2xl text-gray-500 font-bold font-heading">
                            {/* {capitalizeWord(post?.title)} */}
                            {post?.title}
                          </h3>
                        </Link>

                        <div style={{overflow: "hidden", textOverflow: "ellipsis",height:'200px' }} class="text-black" dangerouslySetInnerHTML={sanitizedData(post?.description)} ></div>
                        
                        
                        {/* Read more */}
                        <Link to={`/posts/${post?._id}`} className="text-indigo-500 hover:underline">
                          <p className="text-blue-700 cursor-pointer">Read More..</p>
                        </Link>
                        {/* User Avatar */}
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            {/* <Link> */}
                            <img
                              className="h-10 w-10 rounded-full"
                              src={post?.user?.profilePhoto}
                              alt=""
                            />
                            {/* </Link> */}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {/* <Link className="text-yellow-400 hover:underline "> */}
                              {post?.user?.fullName}
                              {/* </Link> */}
                            </p>
                            <div className="flex space-x-1 text-sm text-red-500">
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>
                        {/* <p class="text-gray-500">
                             Quisque id sagittis turpis. Nulla sollicitudin rutrum
                             eros eu dictum...
                           </p> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center bg-slate-500">
        <Pagination totalPosts={all.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}/>
        </div> */}

      </section>
    </>
  );
}