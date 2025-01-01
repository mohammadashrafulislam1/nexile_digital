import React from "react";

const HerfModel = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-3/4 max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside
      >
        <h2 className="text-white text-xl font-bold">Oops!</h2>
        <p className="text-white">The link is not available.</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-white py-1 px-4 text-[20px] rounded-sm poppins-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HerfModel;
