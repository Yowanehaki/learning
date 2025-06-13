import React from 'react';

const Validation = ({ isOpen, onClose, onConfirm, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Validation */}
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        {type === 'warning' ? (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-4">Notice!</h3>
            <p className="text-gray-700 mb-6">
              Please complete all feedback ratings before proceeding.
            </p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Submission</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to submit this feedback?
              Please note that feedback cannot be modified after submission.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Yes, Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Validation;
