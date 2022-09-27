import React, { Component, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateCommentAction } from '../../redux/slices/comments/commentSlices';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';



//Form schema
const formSchema = Yup.object({
    description: Yup.string().required("Plese provide a content to submit the comment"),
});

const EditComment = ({ open, setOpen,commentId,value }) => {


    const ref = useRef(null);
   const dispatch=useDispatch()


    const[description,setDescription]=useState('')

    useEffect(()=>{
        if(value){
            console.log('123');
            setDescription(value)
        }
        
    },[value])
    
    // console.log(description,'description is')
    
    const handleChange = (e) => setDescription(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            id:commentId,
            description: description,
          };

        dispatch(updateCommentAction(data))
        setOpen(false)


    }
    return (
        <>

            {open ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className=" w-full mx-8 md:mx-0 md:w-1/4 my-6  max-w-7xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-300 outline-none focus:outline-none">
                                <div className="flex items-start justify-center p-5 ">
                                    <h3 className="text-2xl font-semibold text-gray-700 text-center"> Edit your Comment </h3>

                                </div>
                                <div className='flex justify-center'>
                                    <input

                                        onChange={handleChange}
                                        value={description}
                                        ref={ref}
                                        type="text"
                                        name="text"
                                        id="text"
                                        className="bg-gray-200 appearance-none  mx-4 pl-2  rounded w-full py-2  text-gray-700  "
                                        placeholder="Edit your comment"
                                    />
                                    {/* <OtpInput className='flex ' inputStyle={{
                                        width: "2rem",
                                        height: "2rem",
                                        margin: "20px 0.25rem",
                                        fontSize: "2rem",
                                        borderRadius: 4,
                                        border: "1px solid #051b34",
                                    }}
                                        value={state.otp}
                                        onChange={handleChange}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                    /> */}
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white bg-rose-900 active:bg-rose-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="text-white bg-emerald-900 active:bg-rose-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default EditComment;