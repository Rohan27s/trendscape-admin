import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/reducers/authSlice';
import { FaHome, FaChartLine, FaClipboardList, FaBox, FaSignOutAlt } from 'react-icons/fa';
import Modal from '../Popup';

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };

  // Define sidebar items with icons
  const sidebarItems = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    // { to: '/analytics', label: 'Analytics', icon: <FaChartLine /> },
    { to: '/orders', label: 'Orders', icon: <FaClipboardList /> },
    { to: '/products', label: 'Products', icon: <FaBox /> }
  ];

  return (
    <div className="bg-white text-gray-600 sticky left-0 top-0 h-screen w-64 flex flex-col shadow-lg border-r border-gray-300">
      <div className="p-4 border-b border-gray-300">
        <h1 className="text-2xl text-center capitalize font-extrabold text-gray-800 select-none">TRENDSCAPE</h1>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <li key={index} className="py-3 px-6">
            <Link
              to={item.to}
              className={`flex items-center text-lg font-semibold hover:bg-gray-800 hover:text-white transition duration-300 py-2 px-4 rounded-md ${
                location.pathname === item.to ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="py-3 px-6 w-full border-t border-gray-300 mt-auto ">
        <button
          onClick={handleLogout}
          className="flex items-center text-lg font-semibold transition duration-300 py-2 px-4 rounded-md"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
      {showLogoutModal && (
        <Modal
          title="Logout Confirmation"
          onClose={() => setShowLogoutModal(false)}
        >
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-end">
            <button className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md" onClick={() => setShowLogoutModal(false)}>Cancel</button>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md" onClick={confirmLogout}>Yes</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
