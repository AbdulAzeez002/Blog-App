import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { registerUserAction,reset,reset2 } from "../../../redux/slices/users/usersSlices";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import Modal from "../../Modal/Modal";
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

//Form schema
const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  mobile: Yup.number().required("Mobile number is required"),
  password: Yup.string().required("Password is required"),
});
//-------------------------------
//Register
//-------------------------------
const Register = () => {
  //select state from store
  const storeData = useSelector(store => store?.users);
  const { loading, appErr, serverErr, isRegistered } = storeData;
  const navigate=useNavigate()
  const [open, setOpen] = useState(false)
  const[otp,setOtp]=useState('')
  const[userDetails,setUserDetails]=useState({})

  const login = useGoogleLogin({
    onSuccess: credentialResponse => console.log(credentialResponse),
  });

useEffect(() => {

  if(appErr=='invalid otp'){
    console.log(appErr,'app err')
    toast.error(appErr)
    setOpen(true)
    dispatch(reset2())
  }
  else{
    toast.error(appErr)
    dispatch(reset2())
  }
  
  if(isRegistered){
    navigate('/login')
    dispatch(reset())
    
    
  }
  if(otp){
    userDetails.otp=otp
    dispatch(registerUserAction(userDetails))
    setOtp('')
  }
}, [isRegistered,otp,appErr,serverErr])


const gooleAuth=(userData)=>{
  dispatch(registerUserAction(userData))
}
const getData = (data) => {
  setOtp(data) // LOGS DATA FROM CHILD (My name is Dean Winchester... &)

  console.log(otp,'otp get');
}

  //dispatch
  const dispatch = useDispatch()
  //formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: async(values) => {
      if (values.password !== values.confirmPassword) {
        console.log('no matcuijdoisfj');
        toast.error('Passwords do not match')
      }
      else {
        const userData = {
          firstName: values.firstName,
          email: values.email,
          mobile: values.mobile,
          lastName: values.lastName,
          password: values.password,
        };
        try {
          console.log('register reached');
          setUserDetails(userData)
          
            
         const response= await axios.post('http://localhost:5000/api/users/otpGenerate',{userData})
         
         console.log(response)
         if(response.status){
          console.log(response.status,'response')
          setOpen(true)
         }
         else{
          console.log('error')
         }


        } catch (error) {
          console.log(error);
        }

      }


    },
    validationSchema: formSchema,
  });



  return (
    <section className="relative pt-7 2xl:pb-20 bg-gray-30 overflow-hidden">
      <div className=" container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className=" mx-auto md:w-1/2 md:mx-auto lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md  ">
                <span className="text-3xl text-cyan-700 font-bold">
                  Register your Account
                </span>
                <h2 className="mt-8 mb-12    2xl: text-3xl font-bold font-heading text-zinc-500">
                  Create an account and start writing down your ideas
                </h2>
              </div>
            </div>
            <div className="lg:w-1/2 px-4 mx-auto lg:pt-20">
              <div className="px-6 lg:px-16 py-12 lg:py-12 bg-cyan-900 rounded-lg">
                <form onSubmit={formik.handleSubmit}>
                  <h3 className="mb-10 text-2xl text-white font-bold font-heading">
                    Register Account
                    {/* display error message*/}
                    {appErr || serverErr ? (
                      <div className="text-red-400">
                        {serverErr} {appErr}
                      </div>
                    ) : null}
                  </h3>
                  {/* First name */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg
                        className="w-5 h-5"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.29593 0.492188C4.81333 0.492188 2.80078 2.50474 2.80078 4.98734C2.80078 7.46993 4.81333 9.48248 7.29593 9.48248C9.77851 9.48248 11.7911 7.46993 11.7911 4.98734C11.7911 2.50474 9.77851 0.492188 7.29593 0.492188ZM3.69981 4.98734C3.69981 3.00125 5.30985 1.39122 7.29593 1.39122C9.28198 1.39122 10.892 3.00125 10.892 4.98734C10.892 6.97342 9.28198 8.58346 7.29593 8.58346C5.30985 8.58346 3.69981 6.97342 3.69981 4.98734Z"
                          fill="black"
                        ></path>
                        <path
                          d="M5.3126 10.3816C2.38448 10.3816 0.103516 13.0524 0.103516 16.2253V19.8214C0.103516 20.0696 0.304772 20.2709 0.55303 20.2709H14.0385C14.2867 20.2709 14.488 20.0696 14.488 19.8214C14.488 19.5732 14.2867 19.3719 14.0385 19.3719H1.00255V16.2253C1.00255 13.4399 2.98344 11.2806 5.3126 11.2806H9.27892C10.5443 11.2806 11.6956 11.9083 12.4939 12.9335C12.6465 13.1293 12.9289 13.1644 13.1248 13.0119C13.3207 12.8594 13.3558 12.5769 13.2033 12.381C12.2573 11.1664 10.8566 10.3816 9.27892 10.3816H5.3126Z"
                          fill="black"
                        ></path>
                        <rect
                          x="15"
                          y="15"
                          width="5"
                          height="1"
                          rx="0.5"
                          fill="black"
                        ></rect>
                        <rect
                          x="17"
                          y="18"
                          width="5"
                          height="1"
                          rx="0.5"
                          transform="rotate(-90 17 18)"
                          fill="black"
                        ></rect>
                      </svg>
                    </span>
                    <input
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                  {/* Last name */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg
                        className="w-5 h-5"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.29593 0.492188C4.81333 0.492188 2.80078 2.50474 2.80078 4.98734C2.80078 7.46993 4.81333 9.48248 7.29593 9.48248C9.77851 9.48248 11.7911 7.46993 11.7911 4.98734C11.7911 2.50474 9.77851 0.492188 7.29593 0.492188ZM3.69981 4.98734C3.69981 3.00125 5.30985 1.39122 7.29593 1.39122C9.28198 1.39122 10.892 3.00125 10.892 4.98734C10.892 6.97342 9.28198 8.58346 7.29593 8.58346C5.30985 8.58346 3.69981 6.97342 3.69981 4.98734Z"
                          fill="black"
                        ></path>
                        <path
                          d="M5.3126 10.3816C2.38448 10.3816 0.103516 13.0524 0.103516 16.2253V19.8214C0.103516 20.0696 0.304772 20.2709 0.55303 20.2709H14.0385C14.2867 20.2709 14.488 20.0696 14.488 19.8214C14.488 19.5732 14.2867 19.3719 14.0385 19.3719H1.00255V16.2253C1.00255 13.4399 2.98344 11.2806 5.3126 11.2806H9.27892C10.5443 11.2806 11.6956 11.9083 12.4939 12.9335C12.6465 13.1293 12.9289 13.1644 13.1248 13.0119C13.3207 12.8594 13.3558 12.5769 13.2033 12.381C12.2573 11.1664 10.8566 10.3816 9.27892 10.3816H5.3126Z"
                          fill="black"
                        ></path>
                        <rect
                          x="15"
                          y="15"
                          width="5"
                          height="1"
                          rx="0.5"
                          fill="black"
                        ></rect>
                        <rect
                          x="17"
                          y="18"
                          width="5"
                          height="1"
                          rx="0.5"
                          transform="rotate(-90 17 18)"
                          fill="black"
                        ></rect>
                      </svg>
                    </span>
                    <input
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                  {/* Email */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg
                        className="w-5 h-5"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.29593 0.492188C4.81333 0.492188 2.80078 2.50474 2.80078 4.98734C2.80078 7.46993 4.81333 9.48248 7.29593 9.48248C9.77851 9.48248 11.7911 7.46993 11.7911 4.98734C11.7911 2.50474 9.77851 0.492188 7.29593 0.492188ZM3.69981 4.98734C3.69981 3.00125 5.30985 1.39122 7.29593 1.39122C9.28198 1.39122 10.892 3.00125 10.892 4.98734C10.892 6.97342 9.28198 8.58346 7.29593 8.58346C5.30985 8.58346 3.69981 6.97342 3.69981 4.98734Z"
                          fill="black"
                        ></path>
                        <path
                          d="M5.3126 10.3816C2.38448 10.3816 0.103516 13.0524 0.103516 16.2253V19.8214C0.103516 20.0696 0.304772 20.2709 0.55303 20.2709H14.0385C14.2867 20.2709 14.488 20.0696 14.488 19.8214C14.488 19.5732 14.2867 19.3719 14.0385 19.3719H1.00255V16.2253C1.00255 13.4399 2.98344 11.2806 5.3126 11.2806H9.27892C10.5443 11.2806 11.6956 11.9083 12.4939 12.9335C12.6465 13.1293 12.9289 13.1644 13.1248 13.0119C13.3207 12.8594 13.3558 12.5769 13.2033 12.381C12.2573 11.1664 10.8566 10.3816 9.27892 10.3816H5.3126Z"
                          fill="black"
                        ></path>
                        <rect
                          x="15"
                          y="15"
                          width="5"
                          height="1"
                          rx="0.5"
                          fill="black"
                        ></rect>
                        <rect
                          x="17"
                          y="18"
                          width="5"
                          height="1"
                          rx="0.5"
                          transform="rotate(-90 17 18)"
                          fill="black"
                        ></rect>
                      </svg>
                    </span>
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  {/* mobile */}

                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg
                        className="w-5 h-5"
                        width="17"
                        height="21"
                        viewBox="0 0 17 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z"
                          fill="black"
                        ></path>
                        <path
                          d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9906 8.74572 15.1907 8.49957 15.1907C8.25342 15.1907 8.05278 14.9906 8.05278 14.7439V12.7088C8.05278 12.5502 7.96833 12.4032 7.83072 12.3228C7.41026 12.078 7.1592 11.6468 7.1592 11.1696C7.1592 10.4307 7.76062 9.82925 8.49957 9.82925C9.2381 9.82925 9.83994 10.4307 9.83994 11.1696C9.83994 11.6468 9.58881 12.078 9.16793 12.3228Z"
                          fill="black"
                        ></path>
                      </svg>
                    </span>
                    <input
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="number"
                      placeholder="Mobile"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>



                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg
                        className="w-5 h-5"
                        width="17"
                        height="21"
                        viewBox="0 0 17 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z"
                          fill="black"
                        ></path>
                        <path
                          d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9906 8.74572 15.1907 8.49957 15.1907C8.25342 15.1907 8.05278 14.9906 8.05278 14.7439V12.7088C8.05278 12.5502 7.96833 12.4032 7.83072 12.3228C7.41026 12.078 7.1592 11.6468 7.1592 11.1696C7.1592 10.4307 7.76062 9.82925 8.49957 9.82925C9.2381 9.82925 9.83994 10.4307 9.83994 11.1696C9.83994 11.6468 9.58881 12.078 9.16793 12.3228Z"
                          fill="black"
                        ></path>
                      </svg>
                    </span>
                    <input
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.password && formik.errors.password}
                  </div>

                  {/* confirm pass */}


                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg
                        className="w-5 h-5"
                        width="17"
                        height="21"
                        viewBox="0 0 17 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z"
                          fill="black"
                        ></path>
                        <path
                          d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9906 8.74572 15.1907 8.49957 15.1907C8.25342 15.1907 8.05278 14.9906 8.05278 14.7439V12.7088C8.05278 12.5502 7.96833 12.4032 7.83072 12.3228C7.41026 12.078 7.1592 11.6468 7.1592 11.1696C7.1592 10.4307 7.76062 9.82925 8.49957 9.82925C9.2381 9.82925 9.83994 10.4307 9.83994 11.1696C9.83994 11.6468 9.58881 12.078 9.16793 12.3228Z"
                          fill="black"
                        ></path>
                      </svg>
                    </span>
                    <input
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange("confirmPassword")}
                      onBlur={formik.handleBlur("confirmPassword")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="password"
                      placeholder="Confirm Your Password"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.confirmPassword && formik.errors.confirmPassword}
                  </div>

                  <div className="inline-flex mb-10"></div>

                  {/* Check for loading */}
                  {loading ? (
                    <button
                      disabled
                      className="py-4 w-full bg-gray-500  text-white font-bold rounded-full transition duration-200"
                    >
                      loading please wait...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="py-4 w-full bg-emerald-700 hover:bg-emerald-900 text-white font-bold rounded-full transition duration-200"
                    >
                      SIGN UP
                    </button>
                  )}
                </form>
                  <span className="flex justify-center text-white font-bold mt-1">
                    OR
                  </span>
                {/* <button onClick={() => login()}
                      type="submit"
                      className="py-4 mt-3 w-full bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-full transition duration-200"
                    >
                      SIGN UP WITH GOOGLE
    
    </button> */}
<div className="mt-4 pl-12 lg:pl-10 lg:ml-8 sm:pl-10" >
<GoogleLogin 
  onSuccess={credentialResponse => {
    var decoded = jwt_decode(credentialResponse.credential);
    const userData = {
      firstName: decoded.given_name,
      email: decoded.email,
      lastName: decoded.family_name,
      password: decoded.sub,
    };

    gooleAuth(userData);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal open={open} setOpen={setOpen} onSubmit={getData} />
      </div>
    </section>
  );
};

export default Register;
