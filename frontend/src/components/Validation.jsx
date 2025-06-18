import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Validation = ({ isOpen, onClose, onConfirm, type }) => {
  const { language } = useLanguage();
  
  if (!isOpen) return null;

  const translations = {
    ID: {
      warning: {
        title: 'Perhatian!',
        message: 'Harap selesaikan semua penilaian form sebelum melanjutkan.',
        close: 'Tutup'
      },
      confirmation: {
        title: 'Konfirmasi Pengiriman',
        message: 'Apakah Anda yakin ingin mengirimkan form ini? Harap diperhatikan bahwa form tidak dapat diubah setelah dikirimkan.',
        cancel: 'Batal',
        submit: 'Ya, Submit'
      }
    },
    EN: {
      warning: {
        title: 'Notice!',
        message: 'Please complete all feedback assessments before proceeding.',
        close: 'Close'
      },
      confirmation: {
        title: 'Submission Confirmation',
        message: 'Are you sure you want to submit this feedback? Please note that feedback cannot be modified after submission.',
        cancel: 'Cancel',
        submit: 'Yes, Submit'
      }
    }
  };

  const content = translations[language];

  // Memeriksa apakah tipe validasi adalah 'warning' atau 'confirmation'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Validation */}
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        {type === 'warning' ? (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-4">{content.warning.title}</h3>
            <p className="text-gray-700 mb-6">{content.warning.message}</p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
              >
                {content.warning.close}
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{content.confirmation.title}</h3>
            <p className="text-gray-700 mb-6">{content.confirmation.message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
              >
                {content.confirmation.cancel}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
              >
                {content.confirmation.submit}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Validation;
