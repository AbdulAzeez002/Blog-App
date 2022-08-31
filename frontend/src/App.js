import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/Home/HomPage';
import Register from './components/User/Register/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/User/Login/Login';
import Navbar from './components/Navigation/Navbar';
import AddNewCategory from './components/Categories/AddNewCategory';
import CategoryList from './components/Categories/CategoryList';
import UpdateCategory from "./components/Categories/UpdateCategory";
import Modal from './components/Modal/Modal';
import AdminProtected from './components/Navigation/ProtectedRoutes/AdminRoute';
import CreatePost from './components/Posts/CreatePost';
import UserProtected from './components/Navigation/ProtectedRoutes/PrivateProtectedRoute';
import AdminHome from './components/Home/AdminHome';
import PostsList from './components/Posts/PostsList';
import UserHome from './components/Home/UserHome';
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {
  return (
    <>

<GoogleOAuthProvider clientId="532847267857-tdpepd8lv7ajn68ft76to25hap0mgutl.apps.googleusercontent.com">
<Router>

<Navbar />
<Routes>
  <Route path='/' element={<HomePage />} />
  <Route path='/register' element={<Register />} />
  <Route path='/login' element={<Login />} />
  <Route path='/add-category' element={
    <AdminProtected >
      <AddNewCategory />
    </AdminProtected>
  } />

  <Route path='/adminHome' element={
    <AdminProtected >
      <AdminHome />
    </AdminProtected>
  } />


  <Route path='/category-list' element={<CategoryList />} />
  <Route path='/update-category/:id' element={<UpdateCategory />} />
  <Route path='/create-post' element={
    <UserProtected >
      <CreatePost />
    </UserProtected>
  } />

  <Route path='/userHome' element={
    <UserProtected >
      <UserHome />
    </UserProtected>
  } />

  <Route path='/posts' element={<PostsList />} />

</Routes>

</Router>
<ToastContainer toastClassName=" relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer" />

</GoogleOAuthProvider>
      

    </>

  );
}

export default App;
