import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  orderDetails: null,
  revenueData: null,
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
    fetchOrderDetailsStart(state) {
      state.loading = true;
      state.error = null;
      state.orderDetails = null;
    },
    fetchOrderDetailsSuccess(state, action) {
      state.orderDetails = action.payload;
      state.loading = false;
    },
    setRevenueData(state, action) {
      state.revenueData = action.payload;
    },
    fetchOrderDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteOrderSuccess(state) {
      state.loading = false;
    },
    deleteOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderDetailsStart,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  setRevenueData, 
} = orderSlice.actions;

// Async action creator for fetching orders
export const fetchOrders = (token) => async (dispatch) => {
  dispatch(fetchOrdersStart());

  try {
    const response = await axios.get(
      'https://trendscape-backend.vercel.app/api/orders/all-orders',
      {
        headers: {
          Authorization: token, // Include the token in the Authorization header
        },
      }
    );

    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    dispatch(fetchOrdersFailure(error.message));
  }
};
export const fetchRevenueData = () => async (dispatch) => {
  try {
    const response = await axios.get('https://trendscape-backend.vercel.app/api/revenue/');
    dispatch(setRevenueData(response.data));
  } catch (error) {
    console.error('Failed to fetch revenue data:', error);
  }
};
// Async action creator for fetching order details by ID
export const fetchOrderDetails = (orderId) => async dispatch => {
  dispatch(fetchOrderDetailsStart());

  try {
    const response = await axios.get(`https://trendscape-backend.vercel.app/api/orders/${orderId}`, {
      headers: {
        'Authorization': 'your_auth_token_here'
      }
    });

    dispatch(fetchOrderDetailsSuccess(response.data));
  } catch (error) {
    console.error('Failed to fetch order details:', error);
    dispatch(fetchOrderDetailsFailure(error.message));
  }
};
export const deleteOrder = (orderId) => async dispatch => {
  dispatch(deleteOrderStart());

  try {
    await axios.delete(`https://trendscape-backend.vercel.app/api/orders/${orderId}`, {
      headers: {
        'Authorization': 'your_auth_token_here'
      }
    });

    dispatch(deleteOrderSuccess());
    // Optionally, you can dispatch fetchOrders to refresh the orders list after deletion
    dispatch(fetchOrders());
  } catch (error) {
    console.error('Failed to delete order:', error);
    dispatch(deleteOrderFailure(error.message));
  }
};
export default orderSlice.reducer;
