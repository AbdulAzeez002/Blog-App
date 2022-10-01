

import React, { useState } from "react";
import { useFormik } from "formik";
// import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useMemo, useRef } from "react";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import { createpostAction, reset } from "../../redux/slices/posts/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";
import { useEffect } from "react";
import JoditEditor from "jodit-react";


//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});

//css for dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color:'red'
  transition: border 0.24s ease-in-out;
`;


export default function CreatePost() {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //select store data
  const post = useSelector(state => state?.post);
  const { isCreated, loading, appErr, serverErr } = post;
  


  const user=useSelector(state=>state.users)
  const {userAuth}=user
  

  const [preview,setPreview]=useState('')
  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description:"",
      category: "",
      image: "",
      subCategory:""
    },
    onSubmit: values => {
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values.description,
        image: values?.image,
        subCategory:values?.subCategory
      };
      console.log(data)
      //dispath the action
      dispatch(createpostAction(data));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (isCreated) {
      navigate('/login')
    }
    dispatch(reset())
  }, [isCreated])


  useEffect(()=>{
   if(formik?.values?.image){
   const reader=new FileReader();
   reader.onloadend=()=>{
    setPreview(reader.result)
   }
   reader.readAsDataURL(formik?.values?.image)
   }
   else{
    setPreview(null)
   }
  },[formik?.values?.image])


 console.log(formik?.values?.image,'image')

  return (
    <>
    {
      !userAuth?.blocked ? <div className=" container bg-gray-30 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-cyan-900">
          CREATE A POST
        </h2>

        <p className="mt-2 text-center text-sm ">
          <p className="font-medium text-rose-800 hover:text-rose-500">
            Share your ideas to the word. Your post must be free from
            profanity
          </p>
        </p>

        {appErr || serverErr ? (
          <p className="mt-2 text-center text-lg text-rose-800">
            {serverErr} {appErr}
          </p>
        ) : null}
      </div>
      <div className=" mt-8 px-4 sm:mx-auto md:w-full md:max-w-xl">
        <div className=" bg-white py-8 border border-black px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1 mb-5 ">
                {/* Title */}
                <input
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  id="title"
                  name="title"
                  type="title"
                  autoComplete="title"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-rose-700">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
            <label
              htmlFor="email"
              className="block mt-8 text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <div >
            <CategoryDropDown
          
          value={formik.values.category?.label}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          error={formik.errors.category}
          touched={formik.touched.category}
        />
            </div>

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
            
            
            {/* Category input goes here */}
            
            <div>
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


{/* 
              <textarea
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea> */}

              
              {/* Err msg */}
              <div className="text-rose-700">
                {formik?.touched?.description && formik.errors.description}
              </div>

              {/* Image component */}
              <label
                htmlFor="password"
                className="block text-sm font-medium mt-3 mb-2 text-gray-700"
              >
                Select image to upload
              </label>

              {
                preview ?<img src={preview} onClick={()=>{
                  setPreview(null)
                 }}/> :<Container className="container bg-gray-700">
                 <Dropzone
                   onBlur={formik.handleBlur("image")}
                   accept="image/jpeg, image/png"
                   onDrop={acceptedFiles => {
                     formik.setFieldValue("image", acceptedFiles[0]);
                   }}
                 >
                   {({ getRootProps, getInputProps }) => (
                     <div className="container">
                       <div
                         {...getRootProps({
                           className: "dropzone",
                           onDrop: event => event.stopPropagation(),
                         })}
                       >
                         <input {...getInputProps()} />
                         <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                           Click here to select image
                         </p>
                       </div>
                     </div>
                   )}
                 </Dropzone>
               </Container>
              }
              {/* <Container className="container bg-gray-700">
                <Dropzone
                  onBlur={formik.handleBlur("image")}
                  accept="image/jpeg, image/png"
                  onDrop={acceptedFiles => {
                    formik.setFieldValue("image", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="container">
                      <div
                        {...getRootProps({
                          className: "dropzone",
                          onDrop: event => event.stopPropagation(),
                        })}
                      >
                        <input {...getInputProps()} />
                        <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                          Click here to select image
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </Container> */}


            </div>
             
            
            <div>
              {/* Submit btn */}
              {loading ? (
                <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  "
                >
                  Loading please wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 "
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div> : <div className="text-red-400 text-2xl min-h-screen flex justify-center items-center"><h1>you are blocked by admin</h1></div>
    }
      
    </>
  );
}