import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BookingDetails = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-5xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-red-500 font-bold text-2xl"
        >
          ×
        </button>
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
          Booking Details
        </h2>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-6">
          <img
            src={booking.vehicleImg || "https://via.placeholder.com/150"}
            alt="Vehicle"
            className="w-full md:w-3/6 h-72 object-center rounded-lg border border-gray-300 dark:border-gray-700"
          />
          <div className="flex flex-col items-start gap-3 w-full md:w-1/2">
            <p className="text-xl font-semibold text-blue-600 dark:text-yellow-400">
              {booking.vehicleName}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <strong>Trip Type:</strong> {booking.tripType}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <strong>Pickup Location:</strong> {booking.pickupLocation}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <strong>Drop Location:</strong> {booking.dropLocation}
            </p>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              <strong>Total Cost:</strong> ₹{booking.totalCost}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              <strong>Driver:</strong> {booking.withDriver ? "Yes" : "No"}
            </p>
            <Stack>
              <Button
                variant="contained"
                color="error"
                onClick={onClose}
                className="mt-4 w-44"
              >
                Close
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;


