import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = ({  children }) => {
//check if user is loggin
const user = useSelector(state => state?.users);
const { userAuth } = user;

 if (!userAuth?.isAdmin) {
 return <Navigate to="/login" replace />;
 }
 return children;
};
export default AdminProtected;