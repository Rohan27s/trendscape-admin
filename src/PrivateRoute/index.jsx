import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../Component/Sidebar';
import Modal from '../Component/Popup';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Perform logout action here
    // For example, dispatch a logout action
    // Then redirect to the login page
    setShowLogoutModal(false);
    // Dispatch logout action
    // Redirect to login page
  };

  const toggleModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  return isAuthenticated ? (
    <div className="flex w-full">
      <Sidebar />
      <div className='p-8 w-full'>
        {element}
      </div>
      {/* Logout Modal */}
      {showLogoutModal && (
        <Modal
          title="Logout Confirmation"
          onClose={toggleModal}
        >
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-end">
            <button className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md" onClick={toggleModal}>Cancel</button>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md" onClick={handleLogout}>Yes</button>
          </div>
        </Modal>
      )}
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
