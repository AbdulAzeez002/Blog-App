import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { loginUserAction, reset } from "../../../redux/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

//Form schema
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {

  const gooleAuth = (userData) => {
    dispatch(loginUserAction(userData))
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const store = useSelector(state => state?.users);
  const { userAuth, loading, serverErr, appErr } = store;

  useEffect(() => {
    // if(serverErr){
    //   toast.error(serverErr)
    // }

    if (appErr) {
      console.log(appErr, 'app err')
      toast.error(appErr)
      dispatch(reset())
    }

    if (userAuth) {
      if (userAuth?.isAdmin) {
        navigate('/adminHome')
      }
      else if(!userAuth?.blocked) {
        navigate('/userHome')
      }
      else{
        toast.error('You are blocked by the admin')
      }
    }

  }, [userAuth, appErr, serverErr])


  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      //dispath the action
      dispatch(loginUserAction(values))
      console.log(values);
    },
    validationSchema: formSchema,
  });
  return (
    <>
      <section className="min-h-screen relative py-20 2xl:py-20 bg-gray-30 overflow-hidden">
        {/* <div className="absolute top-0 left-0 lg:bottom-0 h-full lg:h-auto w-full lg:w-4/12 bg-violet-500 lg:overflow-hidden">
          <img
            className="hidden lg:block h-full w-full object-cover"
            src={poster}
            alt=""
          />
        </div> */}
        <div className="relative container pt-10 px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-2/5 px-4">
                <div className="px-6 lg:px-12 py-12 lg:py-24 bg-cyan-900 shadow-lg rounded-lg">
                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className="mb-10 text-white text-2xl font-bold font-heading">
                      {/* Header */}
                      Login to your Account
                    </h3>
                    <div className="flex items-center pl-6 mb-3 border border-gray-50 bg-white rounded-full">
                      <span className="inline-block pr-3 border-r border-gray-50">
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
                      {/* Email */}
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                        type="email"
                        placeholder="enter email"
                      />
                    </div>
                    {/* Err message */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <div className="flex items-center pl-6 mb-6 border border-gray-50 bg-white rounded-full">
                      <span className="inline-block pr-3 border-r border-gray-50">
                        <svg
                          className="w-5 h-5"
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.6243 13.5625C15.3939 13.5625 15.2077 13.7581 15.2077 14V16.4517C15.2077 18.2573 14.0443 20.125 12.0973 20.125H5.42975C3.56848 20.125 1.87435 18.3741 1.87435 16.4517V10.5H15.6243C15.8547 10.5 16.041 10.3044 16.041 10.0625C16.041 9.82058 15.8547 9.625 15.6243 9.625H15.2077V5.95175C15.2077 2.39183 12.8635 0 9.37435 0H7.70768C4.21855 0 1.87435 2.39183 1.87435 5.95175V9.625H1.45768C1.22728 9.625 1.04102 9.82058 1.04102 10.0625V16.4517C1.04102 18.8322 3.13268 21 5.42975 21H12.0972C14.3089 21 16.0409 19.0023 16.0409 16.4517V14C16.041 13.7581 15.8547 13.5625 15.6243 13.5625ZM2.70768 5.95175C2.70768 2.86783 4.67022 0.875 7.70768 0.875H9.37435C12.4119 0.875 14.3743 2.86783 14.3743 5.95175V9.625H2.70768V5.95175Z"
                            fill="black"
                          ></path>
                          <path
                            d="M18.8815 9.3711C18.7482 9.17377 18.4878 9.12827 18.3003 9.26701L8.58655 16.4919L6.75235 14.5655C6.58942 14.3944 6.32608 14.3944 6.16322 14.5655C6.00028 14.7366 6.00028 15.0131 6.16322 15.1842L8.24655 17.3717C8.32695 17.4561 8.43362 17.4999 8.54115 17.4999C8.62488 17.4999 8.70868 17.4732 8.78282 17.4194L18.7828 9.98185C18.9703 9.84143 19.0141 9.56843 18.8815 9.3711Z"
                            fill="black"
                          ></path>
                        </svg>
                      </span>
                      {/* Password */}
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                        type="password"
                        placeholder=" Password"
                      />
                    </div>
                    {/* Err msg */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.password && formik.errors.password}
                    </div>
                    {/* Login btn */}
                    <button
                      type="submit"
                      className="py-4 w-full bg-emerald-700 hover:bg-emerald-900 text-white font-bold rounded-full transition duration-200"
                    >
                      SIGN IN
                    </button>
                    <span className="flex justify-center text-white font-bold mt-1">
                      OR
                    </span>
                    {/* <button
                      type="submit"
                      className="py-4 w-full bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-full transition duration-200"
                    >
                      SIGN IN WITH GOOGLE
                    </button> */}
                    <div className="mt-4 pl-20 lg:pl-2 lg:ml-8 sm:pl-10" >
                      <GoogleLogin
                        onSuccess={credentialResponse => {
                          var decoded = jwt_decode(credentialResponse.credential);
                          const userData = {

                            email: decoded.email,
                            password: decoded.sub,
                          };

                          gooleAuth(userData);
                        }}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                      />;
                    </div>
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-3/5 px-4 mb-16 lg:mb-0 order-first lg:order-last">

                <h2 className="mb-10 text-center text-4xl lg:text-5xl text-cyan-800 font-bold font-heading">
                  Ready to start? Login Now.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
