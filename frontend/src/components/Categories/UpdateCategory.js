import { useEffect} from "react";
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from 'react-router-dom'
import {BiCategory} from 'react-icons/bi'
import {
  fetchCategoryAction,
  reset,
  updateCategoriesAction,
  deleteCategoriesAction,
} from "../../redux/slices/category/categorySlice";

//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const UpdateCategory = ({
  
}) => {

    //get data from store
    const state = useSelector(state => state?.category);

    const { loading, appErr,success, serverErr, category } = state;
  const navigate=useNavigate()
  const dispatch = useDispatch();
  //fetch single category
  useEffect(() => {
    if(success){
      navigate('/category-list')
      dispatch(reset())

    }
    dispatch(fetchCategoryAction(id));
  }, [success]);

  const { id }=useParams();



  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title,
    },
    onSubmit: values => {
      //build up the date for update

      //dispath the action
      dispatch(updateCategoriesAction({ title: values.title, id }));
    },
    validationSchema: formSchema,
  });

  return (
    <div className="flex items-center justify-center bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
        <BiCategory className="mx-auto h-12 w-auto text-cyan-900 " />
          <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-cyan-900">
            Update Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-rose-800 hover:text-rose-900">
              These are the categories user will select when creating a post
            </p>
            {/* Display err */}
            <div>
              {appErr || serverErr ? (
                <h2 className="text-red-500 text-center text-lg">
                  {serverErr} {appErr}
                </h2>
              ) : null}
            </div>
          </p>
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Loading please wait...
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    Update Category
                  </button>
                  <button
                    onClick={() => dispatch(deleteCategoriesAction(id))}
                    type="submit"
                    className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-700 hover:bg-rose-900 "
                  >
                    Delete Category
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
