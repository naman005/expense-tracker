import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import { Toaster } from "react-hot-toast";

export default function App() {

  return (
    <UserProvider>
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
          </Routes>
      </BrowserRouter>
    </div>
    <Toaster 
      toastOptions={{
        className: "",
        style: {
            fontSize: "13px"
          },
        }}
    />
    </UserProvider>
  )
}

const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (<Navigate to='/dashboard' />) : (<Navigate to='/login' />);
}