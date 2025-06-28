import React from "react";

const DeleteVehicleModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center dark:bg-black dark:text-yellow-400">Delete Vehicle</h2>
        <p className="text-center mt-2 dark:bg-black dark:text-white ">Are you sure you want to delete this vehicle?</p>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 bg-gray-300 text-black font-bold rounded-l-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="w-1/2 px-4 py-2 bg-red-500 text-white font-bold rounded-r-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVehicleModal;
