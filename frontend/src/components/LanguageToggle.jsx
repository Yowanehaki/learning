import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  // Membuat tombol untuk mengubah bahasa(Toggle Switch)
  return (
    <div className="relative inline-flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
      {/* Sliding background */}
      <div 
        className={`absolute top-1 bottom-1 w-8 bg-gradient-to-r rounded-full transition-all duration-300 ease-in-out ${
          language === 'ID' 
            ? 'left-1 from-red-500 to-red-600' 
            : 'left-9 from-blue-800 to-blue-900'
        }`}
      />
      
      {/* Buttons */}
      <button
        className={`relative z-10 px-2 py-1 rounded-full text-sm font-medium transition-all duration-300 min-w ${
          language === 'ID' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => setLanguage('ID')}
      >
        ID
      </button>
      <button
        className={`relative z-10 px-2 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
          language === 'EN' ? 'text-white' : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => setLanguage('EN')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;