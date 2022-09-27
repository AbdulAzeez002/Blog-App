import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch,useSelector} from "react-redux";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Plese provide a content to submit the comment"),
});

const UpdateComment = ({ postId }) => {

//dispatch
const dispatch=useDispatch()

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: values => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(createCommentAction(data))
    },
    validationSchema: formSchema,
  });
  return (
    <div className="mx-6 md:mx-0" >
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex md:w-2/5 m-auto "
      >
        <input
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Add New comment"
        />

        <button
          type="submit"
          className=" ml-4 inline-flex items-center px-2.5 py-1.5 border tex-bold border-transparent text-xs font-medium rounded shadow-sm text-white bg-emerald-800 hover:bg-emerald-700 "
        >
          Submit
        </button>
      </form>
      <div className="text-rose-800 mb-2 mt-2 flex justify-center">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
  );
};

export default UpdateComment;
