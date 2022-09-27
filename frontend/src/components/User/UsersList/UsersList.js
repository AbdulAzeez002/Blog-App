import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlices";

import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {

  //data from store
  const users = useSelector(state => state?.users);
  const { usersList,blocked,unblocked,appErr, serverErr, loading } = users;

  //dispatch
  const dispatch = useDispatch();
  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [blocked,unblocked]);
  
  
  return (
    <>
      <section class="pt-24 bg-gray-50 min-h-screen">
        {loading ? (
          <h1>Loading</h1>
        ) : appErr || serverErr ? (
          <h3>
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map(user => (
            < >
               {
                !user?.isAdmin ?<UsersListItem user={user} />:null
               }
              
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
