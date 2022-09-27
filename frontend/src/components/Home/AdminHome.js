import React from 'react'
import poster from "../../img/blogLogo.webp";
const AdminHome = () => {
  return (
    <section className=" pt-28 px-14 bg-gray-30">
        <div className="relative container px-auto pt-20 ">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className="text-6xl font-bold text-cyan-700 ">
                Admin Panel
              </span>
              <h2 className="max-w-2xl mt-12 mb-12 text-4xl 2xl:text-5xl text-gray-500 font-bold font-heading">
                Manage Posts and Authors{" "}
                
              </h2>
              {/* <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-cyan-500 text-bold">
                Your post must be free from racism and unhealthy words
              </p> */}
              
            </div>
            <div className="w-full lg:w-1/2 px-4 ">
              <img className=" rounded-lg shadow-xl" src={poster} alt={poster} />
            </div>
          </div>
        </div>
      </section>
  )
}

export default AdminHome