import React, { Component, useState } from 'react';
import OtpInput from 'react-otp-input';


const Modal = ({ open, setOpen,onSubmit }) => {
    const [state, setState] = useState({ otp: "" });
    const handleChange = (otp) => setState({ otp });
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        console.log(state.otp,'child');
        onSubmit(state.otp);
        setOpen(false)


    }
    return (
        <>
          
            {open ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="  w-1/4 my-6 mx-auto max-w-7xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-center p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font-semibold text-center"> Enter Your OTP </h3>
                                    
                                </div>
                                <div className='flex justify-center'>
                                    <OtpInput className='flex ' inputStyle={{
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
                                    />
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white bg-rose-700 active:bg-rose-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-rose-700 active:bg-rose-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Submit
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

export default Modal;