import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action) {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess(state, action) {
      state.product = action.payload;
      state.loading = false;
    },
    updateProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, fetchProductStart, fetchProductSuccess, fetchProductFailure, updateProductStart, updateProductSuccess, updateProductFailure } = productSlice.actions;

// Async action creator for updating a product
export const updateProduct = (productId, updatedProductData) => async dispatch => {
  dispatch(updateProductStart());

  try {
    const response = await axios.put(`https://trendscape-backend.vercel.app/api/products/${productId}`, updatedProductData);
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    console.error('Failed to update product:', error);
    dispatch(updateProductFailure(error.message));
  }
};

// Async action creator for deleting a product
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(updateProductStart());

  try {
    await axios.delete(`https://trendscape-backend.vercel.app/api/products/${productId}`);
    dispatch(updateProductSuccess(null)); // Assuming null as success response for delete operation
  } catch (error) {
    console.error('Failed to delete product:', error);
    dispatch(updateProductFailure(error.message));
  }
};

// Async action creator for fetching products
export const fetchProducts = () => async dispatch => {
  dispatch(fetchProductsStart());

  try {
    const response = await axios.get('https://trendscape-backend.vercel.app/api/products/');
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    dispatch(fetchProductsFailure(error.message));
  }
};

// Async action creator for fetching a single product detail by ID
export const fetchProductById = (productId) => async dispatch => {
  dispatch(fetchProductStart());

  try {
    const response = await axios.get(`https://trendscape-backend.vercel.app/api/products/${productId}`);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    console.error('Failed to fetch product detail:', error);
    dispatch(fetchProductFailure(error.message));
  }
};
// Async action creator for creating a new product
export const createProduct = (newProductData) => async (dispatch) => {
  dispatch(updateProductStart());

  try {
    const response = await axios.post('https://trendscape-backend.vercel.app/api/products/', newProductData);
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    console.error('Failed to create product:', error);
    dispatch(updateProductFailure(error.message));
  }
};

export default productSlice.reducer;
