import { useEffect,useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPostsAction, toggleAddLikesToPost, toggleAddDisLikesToPost, } from "../../redux/slices/posts/postSlices";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";

export default function PostsList() {

   //select post from store
   const post = useSelector(state => state?.post);

   const { postLists, loading, appErr, serverErr, likes, dislikes } = post;

  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(10);

  // // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = postLists.slice(indexOfFirstPost, indexOfLastPost);

  // // Change page
  // const paginateFront = () => setCurrentPage(currentPage + 1);
  // const paginateBack = () => setCurrentPage(currentPage - 1);


 
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [likes, dislikes]);

  //fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);


  // console.log(postLists);

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
        <div class="py-20 bg-white min-h-screen radius-for-skewed">
          <div class="container mx-auto px-4">
            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2 pt-5">
                <span class="text-gray-600 text-2xl font-bold">
                  See Posts From Our Awesome Authors
                </span>
                {/* <h2 class="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2> */}
              </div>
              {/* View All */}
              {/* <div class=" block text-right w-1/2">
                
                <button class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200">
                  View All Posts
                </button>
              </div> */}
            </div>
            <div class="flex flex-wrap  -mx-3">
              <div class="mb-8  lg:mb-0 w-full lg:w-1/4 px-3">
                <div class=" mx-4 py-4 px-6 bg-white border border-black shadow rounded">
                  <h4 class="mb-4 text-gray-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
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
                          <p onClick={() => dispatch(fetchPostsAction(category.title))} className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-500">
                            {category?.title}
                          </p>
                        </li>
                      ))

                    )

                      // <li>
                      //       <p onClick={()=>dispatch(fetchPostsAction(category.title))} className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-500">
                      //         All
                      //       </p>
                      //     </li>



                    }
                  </ul>
                </div>
              </div>
              <div class="w-full lg:w-3/4 px-3 ">
                {/* Post goes here */}

                {appErr || serverErr ? (
                  <h1>Err</h1>
                ) : postLists?.length <= 0 ? (
                  <h1>No Post Found</h1>
                ) : (
                  postLists?.map(post => (
                    <div
                      
                      className=" mx-4 border border-black flex flex-wrap mb-12 bg-white   lg:mb-6 "
                    >
                      <div class="mb-14 mt-4  w-full lg:w-1/4 px-3">
                        {/* <Link> */}
                        {/* Post image */}
                        <img
                          class="w-auto h-auto object-cover rounded "
                          src={post?.image}
                          alt=""
                        />
                        {/* </Link> */}
                        {/* Likes, views dislikes */}
                        <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="">
                              <ThumbUpIcon
                                onClick={() =>
                                  dispatch(toggleAddLikesToPost(post?._id))
                                  
                                }
                                className="h-7 w-7 text-indigo-600 cursor-pointer"
                              />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.likes?.length}
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <ThumbDownIcon
                                onClick={() =>
                                  dispatch(toggleAddDisLikesToPost(post?._id))
                                }
                                className="h-7 w-7 cursor-pointer text-gray-600"
                              />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.disLikes?.length}
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
                        </div>
                      </div>
                      <div class="w-full lg:w-3/4 px-3">
                        {/* <Link class="hover:underline"> */}
                        <h3 class="mb-1 text-2xl text-gray-500 font-bold font-heading">
                          {/* {capitalizeWord(post?.title)} */}
                          {post?.title}
                        </h3>
                        {/* </Link> */}
                        <div style={{overflow: "hidden", textOverflow: "ellipsis",height:'50px' }} class="text-black" dangerouslySetInnerHTML={{ __html: post?.description }}>
                          
                        </div>
                        {/* Read more */}
                        <Link
                          to={`/posts/${post?._id}`}
                          className="text-indigo-500 hover:underline"
                        >
                          Read More..
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
                              {post?.user?.firstName} {post?.user?.lastName}
                              {/* </Link> */}
                            </p>
                            <div className="flex space-x-1 text-sm text-green-500">
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

      </section>
    </>
  );
}