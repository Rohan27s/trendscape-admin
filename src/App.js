import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import taphe CSS for toastify
import { store, persistor } from './Redux/store';
import PrivateRoute from './PrivateRoute';
import Login from './Pages/Login';
import './index.css';
import Home from './Pages/Home';
import Analytics from './Pages/Analytics';
import Products from './Pages/Products';
import Orders from './Pages/Orders.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PrivateRoute element={<Home/>} />} />
            <Route path="/analytics" element={<PrivateRoute element={<Analytics/>} />} />
            <Route path="/orders" element={<PrivateRoute element={<Orders/>} />} />
            <Route path="/products" element={<PrivateRoute element={<Products/>} />} />
          </Routes>
        </Router>
        <ToastContainer /> {/* Add ToastContainer here */}
      </PersistGate>
    </Provider>
  );
};

export default App;
