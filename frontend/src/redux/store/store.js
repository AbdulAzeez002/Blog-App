import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/category/categorySlice";
import post from "../slices/posts/postSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoriesReducer,
    post
  },
});

export default store;