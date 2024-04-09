import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons
import { login } from '../../Redux/reducers/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    return () => {
      // Reset loading state when component unmounts
      dispatch({ type: 'auth/loginFailure' });
    };
  }, [dispatch]);

  const startSignIn = async () => {
    if (email.trim() === '' || !validateEmail(email)) {
      // Validate email format
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!loading) {
      try {
        dispatch(login({ email, password }));
      } catch (error) {
        console.error('Login failed:', error);
        toast.error('Failed to login. Please try again later.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    startSignIn();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      startSignIn();
    }
  };

  if (isAuthenticated) {
    return <Navigate to={location.state?.from || '/'} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Left Side: Image */}
      <div className="hidden md:block md:w-2/3 md:h-screen relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Use React Icons for the logo */}
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1637841930768-91940cb7e479?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your logo URL
          alt="Trendscape Logo"
        />
      </div>
      {/* Right Side: Login Form */}
      <div className="w-full h-screen flex items-center md:w-1/3 bg-gray-50 px-8 py-12">
        <div className="w-[90%] mx-auto p-8 bg-Neutral-300 shadow-lg border bg-white border-gray-200 rounded-xl">
          <h2 className="text-3xl mb-8 font-bold text-gray-900 text-center">Admin Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 px-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-lg h-10 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="mt-1 px-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-lg h-10 pr-10"
                  value={password}
                  
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                {/* Eye icon for password visibility toggle */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                </span>
              </div>
            </div>
            <div>
              <button
                type="button"
                disabled={loading} // Disable button when loading
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'}`}
                onClick={handleLogin}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
