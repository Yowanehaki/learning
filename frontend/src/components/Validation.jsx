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
            <h3 className="text-xl font-bold text-red-600 mb-4">Perhatian!</h3>
            <p className="text-gray-700 mb-6">
              Harap selesaikan semua penilaian umpan balik sebelum melanjutkan.
            </p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
              >
                Tutup
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Konfirmasi Pengiriman</h3>
            <p className="text-gray-700 mb-6">
              Apakah Anda yakin ingin mengirimkan umpan balik ini?
              Harap diperhatikan bahwa umpan balik tidak dapat diubah setelah dikirimkan.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Ya, Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Validation;
