import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm">
      <button
        className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'ID' ? 'bg-red-600 text-white' : 'text-gray-600'
        }`}
        onClick={() => setLanguage('ID')}
      >
        ID
      </button>
      <button
        className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'EN' ? 'bg-blue-900 text-white' : 'text-gray-600'
        }`}
        onClick={() => setLanguage('EN')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
