import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action) {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;

// Async action creator for fetching orders
export const fetchOrders = () => async dispatch => {
  dispatch(fetchOrdersStart());

  try {
    const response = await axios.get('https://trendscape-backend.vercel.app/api/orders/all-orders', {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0ZmRlODQ0M2JkZTY5MjY5Yzc4NjIiLCJpYXQiOjE3MTI2NTE4MDgsImV4cCI6MTcxMjczODIwOH0.Rvhug91KPTZbtM69W7eU1S_8J4X0cMVH48CycZW3So4'
      }
    });
console.log("here",response);
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    dispatch(fetchOrdersFailure(error.message));
  }
};

export default orderSlice.reducer;
