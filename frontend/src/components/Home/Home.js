import React from "react";
import { useSelector } from "react-redux";

import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import HomePage from "./HomPage";

const Home = () => {
  //ge user from store
  const state = useSelector(state => state.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  console.log(isAdmin);
  return (
    <>
      {isAdmin ? (
        <AdminHome  />
      ) : userAuth ? (
        <UserHome  />
      ) : (
        <HomePage />
      )}
    </>
  );
};

export default Home;
