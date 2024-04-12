import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authSlice';
import orderReducer from './reducers/ordersSlice'
import productReducer from './reducers/productSlice'


import { getDefaultMiddleware } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  orders:orderReducer,
  products:productReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store); 
