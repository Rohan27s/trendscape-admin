import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white w-auto mx-auto rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
