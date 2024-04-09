import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure(state) {
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async action creator for login
export const login = ({ email, password }) => async dispatch => {
  dispatch(loginStart());

  try {
    const response = await axios.post('https://trendscape-backend.vercel.app/api/signin', {
      email,
      password
    });

    const user = response.data;

    if (user.isAdmin) {
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure());
      toast.error('You are not an Admin');
    }
  } catch (error) {
    console.error('Login failed:', error);
    dispatch(loginFailure());
    toast.error('Failed to login. Please try again later.');
  }
};

export default authSlice.reducer;
