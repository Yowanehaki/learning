import React from 'react';
import logo from '../assets/logo.png';

 //Tampilan halaman apresiasi setelah mengirimkan feedback
const Appreciate = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {/* Logo image */}
        <div className="w-80 h-24 mx-auto mb-8 flex items-center justify-center">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>

        {/* Thank you message */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed">
           Terima kasih atas masukan Anda! Kami menghargai masukan Anda dan akan menggunakannya untuk meningkatkan layanan kami. Dukungan Anda sangat berarti bagi kami.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Appreciate;