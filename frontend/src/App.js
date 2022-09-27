import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
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
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';
import Profile from './components/User/Profile/Profile';
import UploadProfilePhoto from './components/User/Profile/UploadProfilePhoto';
import UpdateProfileForm from './components/User/Profile/UpdateProfileForm';
import UsersList from './components/User/UsersList/UsersList';

function App() {
  return (
    <>

      <GoogleOAuthProvider clientId="532847267857-tdpepd8lv7ajn68ft76to25hap0mgutl.apps.googleusercontent.com">
        <Router>

          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/add-category' element={
              <AdminProtected >
                <AddNewCategory />
              </AdminProtected>
            } />

            <Route path='/users' element={
              <AdminProtected >
                <UsersList />
              </AdminProtected>
            } />

            <Route path='/adminHome' element={
              <AdminProtected >
                <AdminHome />
              </AdminProtected>
            } />

            <Route path='/category-list' element={
              <AdminProtected >
                <CategoryList />
              </AdminProtected>
            } />


            {/* <Route path='/category-list' element={<CategoryList />} /> */}
            <Route path='/update-category/:id' element={<AdminProtected >
              <UpdateCategory />
            </AdminProtected>} />

            <Route path='/create-post' element={
              <UserProtected >
                <CreatePost />
              </UserProtected>
            } />

            <Route path='/update-profile/:id' element={
              <UserProtected >
                <UpdateProfileForm />
              </UserProtected>
            } />


            <Route path='/update-post/:id' element={
              <UserProtected >
                <UpdatePost />
              </UserProtected>
            } />

            <Route path='/userHome' element={
              <UserProtected >
                <UserHome />
              </UserProtected>
            } />

            <Route path='/upload-profile-photo' element={
              <UserProtected >
                <UploadProfilePhoto />
              </UserProtected>
            } />


            <Route path='/profile/:id' element={
              <UserProtected >
                <Profile />
              </UserProtected>
            } />

            <Route path='/posts' element={<PostsList />} />
            <Route path='/posts/:id' element={<PostDetails />} />

          </Routes>

        </Router>
        <ToastContainer toastClassName=" relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer" />

      </GoogleOAuthProvider>


    </>

  );
}

export default App;
