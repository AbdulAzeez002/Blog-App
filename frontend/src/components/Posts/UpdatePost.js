import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import CategoriesOptions from "../Categories/CategoryDropDown";
import JoditEditor from "jodit-react";

import {
  fetchPostDetailsAction,
  updatePostAction,reset
} from "../../redux/slices/posts/postSlices";

//Validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
});

export default function UpdatePost() {
  const editor = useRef(null);
  //selet post
  const postData = useSelector(state => state.post);
  const { postDetails } = postData;

  //select updated post from store;
  const postUpdate = useSelector(state => state.post);
  const { loading, appErr, serverErr, isUpdated } = postUpdate;

  const { id }=useParams();
  const navigate=useNavigate()
  
  //Fetch the post in the url
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  if(isUpdated){
    // console.log(isUpdated);
    navigate(-1)
    dispatch(reset())
  }
   
  }, [id, dispatch,isUpdated]);


  
  
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetails?.title,
      description: postDetails?.description,
      category:"",
      subCategory:""
    },
    onSubmit: values => {
      const data = {
        title: values.title,
        description: values.description,
        category: values?.category?.label,
        subCategory:values?.subCategory,
        id,
      };
      dispatch(updatePostAction(data));
    },
    validationSchema: formSchema,
  });
  return (
    <>
      <div className=" bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
            Are you sure you want to edit{" "}
            <span className="text-rose-700">{postDetails?.title}</span>
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md border border-black">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    onBlur={formik.handleBlur("title")}
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="text-rose-800">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>

              <CategoriesOptions
                value={formik.values.category?.categoryTitle}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              <div>
                  
                  {/* other category */}

               {
                formik.values.category?.label==='Others' ?<><label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Other category name
              </label>
              <div className="mt-1 mb-5 ">
                {/* Title */}
                <input
                  value={formik.values.subCategory}
                  onChange={formik.handleChange("subCategory")}
                  onBlur={formik.handleBlur("subCategory")}
                  id="subCategory"
                  name="subCategory"
                  type="subCategory"
                  autoComplete="subCategory"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div></> :null
               }


                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <JoditEditor
                  ref={editor}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                  />

                {/* <textarea
                  rows="5"
                  cols="10"
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea> */}


                <div className="text-rose-800">
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
