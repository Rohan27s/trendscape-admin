import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from './Redux/store';
import PrivateRoute from './PrivateRoute';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Analytics from './Pages/Analytics';
import Products from './Pages/Products';
import Orders from './Pages/Orders.jsx';
import Product from './Pages/Product/[id].jsx';


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
            <Route path="/products/:id" element={<PrivateRoute element={<Product />} />} /> {/* Route for Product component */}
          </Routes>
        </Router>
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
