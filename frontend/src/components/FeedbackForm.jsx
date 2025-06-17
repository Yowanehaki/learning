import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import StarRate from './starRate'; 
import Validation from './Validation';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { submitFeedback } from '../services/api';
import LanguageToggle from './LanguageToggle';

const FeedbackForm = () => {
  const { language } = useLanguage();
  const [ratings, setRatings] = useState({
    // Sales ratings
    salesPenguasaanProduk: 0,
    salesPenampilan: 0,
    salesKomunikasi: 0,
    salesRespon: 0,
    // Product ratings
    kesesuaianBarang: 0,
    ketepatanWaktu: 0,
    kondisiBarang: 0,
    kesesuaianJumlah: 0,
    // Project Manager
    pelaksanaanProject: 0,
    pmKoordinasi: 0,
    pmPenampilan: 0,
    pmKomunikasi: 0,
    pmRespon: 0,
    pmLaporan: 0,
    // Engineer
    kesesuaianKualifikasi: 0,
    kemampuanTeknis: 0,
    engineerPenampilan: 0,
    engineerKomunikasi: 0,
    engineerRespon: 0,
    engineerLaporan: 0,
    personilBackup: 0,
    // Implementation & Maintenance
    pelaksanaanImplementasi: 0,
    responServiceDesk: 0,
    pemenuhanSLA: 0,
    layananBantuan: 0,
    implLaporan: 0,
  });
   
  const [suggestions, setSuggestions] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

   // Fungsi untuk menangani perubahan rating
  const handleRatingChange = (key, value) => {
    setRatings(prev => ({
      ...prev,
      [key]: value
    }));
  };

   // Navigasi dan penanganan submit
  const navigate = useNavigate();
  // Helper function to check empty ratings
  const checkEmptyRatings = () => {
    return Object.keys(ratings).some(key => {
      if (key === 'personilBackup') return false;
      return ratings[key] === 0;
    });
  };

  // Handle initial submit button click
  const handleSubmitClick = (e) => {
    e.preventDefault();
    // Show confirmation first
    setModalType('confirm');
    setShowModal(true);
  };

  // Handle confirmation submit
  const handleConfirmSubmit = async () => {
    // Check for empty ratings after user confirms
    if (checkEmptyRatings()) {
      setModalType('warning');
      setShowErrors(true);
      setTimeout(() => {
        setShowErrors(false);
      }, 6000);
      return;
    }

    // If all required fields are filled, proceed with submission
    try {
      setShowModal(false);
      
      // Create a copy of ratings and remove personilBackup if it's 0
      const submissionRatings = { ...ratings };
      if (submissionRatings.personilBackup === 0) {
        delete submissionRatings.personilBackup;
      }
      
      const response = await submitFeedback({
        ratings: submissionRatings,
        suggestions
      });
      
      console.log('Submission successful:', response);
      navigate('/appreciate');
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Failed to submit feedback: ${error.message}`);
    }
  };

  const criteriaTranslations = {
    ID: {
      // Sales
      salesPenguasaanProduk: 'Penguasaan Produk',
      salesPenampilan: 'Penampilan',
      salesKomunikasi: 'Komunikasi',
      salesRespon: 'Respon',
      // Product
      kesesuaianBarang: 'Kesesuaian barang/lisensi yang diterima',
      ketepatanWaktu: 'Ketepatan waktu pengiriman',
      kondisiBarang: 'Kondisi barang/lisensi',
      kesesuaianJumlah: 'Kesesuaian jumlah barang/lisensi',
      // Project Manager
      pelaksanaanProject: 'Pelaksanaan Project',
      pmKoordinasi: 'Koordinasi',
      pmPenampilan: 'Penampilan',
      pmKomunikasi: 'Komunikasi',
      pmRespon: 'Respon',
      pmLaporan: 'Laporan',
      // Engineer
      kesesuaianKualifikasi: 'Kesesuaian Kualifikasi',
      kemampuanTeknis: 'Kemampuan Teknis',
      engineerPenampilan: 'Penampilan',
      engineerKomunikasi: 'Komunikasi',
      engineerRespon: 'Respon',
      engineerLaporan: 'Laporan',
      personilBackup: 'Personil Backup (Jika ada)',
      // Implementation
      pelaksanaanImplementasi: 'Pelaksanaan Implementasi',
      responServiceDesk: 'Respon Service Desk',
      pemenuhanSLA: 'Pemenuhan SLA',
      layananBantuan: 'Layanan Bantuan',
      implLaporan: 'Laporan'
    },
    EN: {
      // Sales
      salesPenguasaanProduk: 'Product Knowledge',
      salesPenampilan: 'Appearance',
      salesKomunikasi: 'Communication',
      salesRespon: 'Response',
      // Product
      kesesuaianBarang: 'Product/License Conformity',
      ketepatanWaktu: 'Delivery Timeliness',
      kondisiBarang: 'Product/License Condition',
      kesesuaianJumlah: 'Quantity Conformity',
      // Project Manager
      pelaksanaanProject: 'Project Implementation',
      pmKoordinasi: 'Coordination',
      pmPenampilan: 'Appearance',
      pmKomunikasi: 'Communication',
      pmRespon: 'Response',
      pmLaporan: 'Reporting',
      // Engineer
      kesesuaianKualifikasi: 'Qualification Conformity',
      kemampuanTeknis: 'Technical Ability',
      engineerPenampilan: 'Appearance',
      engineerKomunikasi: 'Communication',
      engineerRespon: 'Response',
      engineerLaporan: 'Reporting',
      personilBackup: 'Backup Personnel (Optional)',
      // Implementation
      pelaksanaanImplementasi: 'Implementation Execution',
      responServiceDesk: 'Service Desk Response',
      pemenuhanSLA: 'SLA Fulfillment',
      layananBantuan: 'Support Service',
      implLaporan: 'Reporting'
    }
  };

  // Update criteria arrays to use translations
  const salesCriteria = [
    { key: 'salesPenguasaanProduk', label: criteriaTranslations[language].salesPenguasaanProduk },
    { key: 'salesPenampilan', label: criteriaTranslations[language].salesPenampilan },
    { key: 'salesKomunikasi', label: criteriaTranslations[language].salesKomunikasi },
    { key: 'salesRespon', label: criteriaTranslations[language].salesRespon }
  ];

  const productCriteria = [
    { key: 'kesesuaianBarang', label: criteriaTranslations[language].kesesuaianBarang },
    { key: 'ketepatanWaktu', label: criteriaTranslations[language].ketepatanWaktu },
    { key: 'kondisiBarang', label: criteriaTranslations[language].kondisiBarang },
    { key: 'kesesuaianJumlah', label: criteriaTranslations[language].kesesuaianJumlah }
  ];

  const projectManagerCriteria = [
    { key: 'pelaksanaanProject', label: criteriaTranslations[language].pelaksanaanProject },
    { key: 'pmKoordinasi', label: criteriaTranslations[language].pmKoordinasi },
    { key: 'pmPenampilan', label: criteriaTranslations[language].pmPenampilan },
    { key: 'pmKomunikasi', label: criteriaTranslations[language].pmKomunikasi },
    { key: 'pmRespon', label: criteriaTranslations[language].pmRespon },
    { key: 'pmLaporan', label: criteriaTranslations[language].pmLaporan }
  ];

  const engineerCriteria = [
    { key: 'kesesuaianKualifikasi', label: criteriaTranslations[language].kesesuaianKualifikasi },
    { key: 'kemampuanTeknis', label: criteriaTranslations[language].kemampuanTeknis },
    { key: 'engineerPenampilan', label: criteriaTranslations[language].engineerPenampilan },
    { key: 'engineerKomunikasi', label: criteriaTranslations[language].engineerKomunikasi },
    { key: 'engineerRespon', label: criteriaTranslations[language].engineerRespon },
    { key: 'engineerLaporan', label: criteriaTranslations[language].engineerLaporan },
    { key: 'personilBackup', label: criteriaTranslations[language].personilBackup }
  ];

  const implementationMaintenanceCriteria = [
    { key: 'pelaksanaanImplementasi', label: criteriaTranslations[language].pelaksanaanImplementasi },
    { key: 'responServiceDesk', label: criteriaTranslations[language].responServiceDesk },
    { key: 'pemenuhanSLA', label: criteriaTranslations[language].pemenuhanSLA },
    { key: 'layananBantuan', label: criteriaTranslations[language].layananBantuan },
    { key: 'implLaporan', label: criteriaTranslations[language].implLaporan }
  ];
  
  const translations = {
    ID: {
      title: 'FORMULIR UMPAN BALIK',
      subtitle: 'PELANGGAN',
      sales: 'PENJUALAN',
      product: 'PRODUK/LISENSI',
      projectManager: 'MANAJER PROYEK',
      engineer: 'TEKNISI',
      implementation: 'IMPLEMENTASI & PEMELIHARAAN',
      suggestions: 'SARAN',
      submit: 'Kirim',
      placeholder: 'Silakan berikan saran atau komentar Anda di sini...'
    },
    EN: {
      title: 'CUSTOMER FEEDBACK',
      subtitle: 'FORM',
      sales: 'SALES',
      product: 'PRODUCT/LICENSE',
      projectManager: 'PROJECT MANAGER',
      engineer: 'ENGINEER',
      implementation: 'IMPLEMENTATION & MAINTENANCE',
      suggestions: 'SUGGESTIONS',
      submit: 'Submit',
      placeholder: 'Please provide your suggestions or comments here...'
    }
  };

 //Merender komponen
  return (
    <div className="max-w-3xl mx-auto sm:px-15 p-6 bg-white border border-gray-200">
  {/* Header */}
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-20 relative">
    <div className="w-80 h-24 sm:w-80 sm:h-30 flex items-center justify-center">
      <img src={logo} alt="logo" className="w-full h-full object-contain" />
    </div>
    <div className="text-center sm:text-left">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 py-3">
        {translations[language].title}
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {translations[language].subtitle}
      </h2>
    </div>
    <div className="absolute right-0 sm:top-14">
      <LanguageToggle />
    </div>
  </div>

      <form onSubmit={handleSubmitClick}>
        
        {/* Sales Section */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-800 pb-3 mb-6">
            <h3 className="text-lg font-bold text-gray-800">{translations[language].sales}</h3>
          </div>
          <div className="space-y-3 sm:px-3">
            {salesCriteria.map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700 flex-1">{item.label}</span>
                <StarRate 
                  value={ratings[item.key]} 
                  onChange={(value) => handleRatingChange(item.key, value)}
                  error={showErrors && ratings[item.key] === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product/License Section */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-800 pb-3 mb-6">
            <h3 className="text-lg font-bold text-gray-800">{translations[language].product}</h3>
          </div>
          <div className="space-y-3 sm:px-3">
            {productCriteria.map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700 flex-1 pr-4">{item.label}</span>
                <StarRate 
                  value={ratings[item.key]} 
                  onChange={(value) => handleRatingChange(item.key, value)}
                  error={showErrors && ratings[item.key] === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Manager Section */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-800 pb-3 mb-6">
            <h3 className="text-lg font-bold text-gray-800">{translations[language].projectManager}</h3>
          </div>
          <div className="space-y-3 sm:px-3">
            {projectManagerCriteria.map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700 flex-1 pr-4">{item.label}</span>
                <StarRate 
                  value={ratings[item.key]} 
                  onChange={(value) => handleRatingChange(item.key, value)}
                  error={showErrors && ratings[item.key] === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Engineer Section */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-800 pb-3 mb-6">
            <h3 className="text-lg font-bold text-gray-800">{translations[language].engineer}</h3>
          </div>
          <div className="space-y-3 sm:px-3">
            {engineerCriteria.map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700 flex-1 pr-4">{item.label}</span>
                <StarRate 
                  value={ratings[item.key]} 
                  onChange={(value) => handleRatingChange(item.key, value)}
                  error={showErrors && ratings[item.key] === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Implementation & Maintenance Section */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-800 pb-3 mb-6">
            <h3 className="text-lg font-bold text-gray-800">{translations[language].implementation}</h3>
          </div>
          <div className="space-y-3 sm:px-3">
            {implementationMaintenanceCriteria.map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700 flex-1 pr-4">{item.label}</span>
                <StarRate 
                  value={ratings[item.key]} 
                  onChange={(value) => handleRatingChange(item.key, value)}
                  error={showErrors && ratings[item.key] === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-800 pb-3 mb-6">
            <h3 className="text-lg font-bold text-gray-800">{translations[language].suggestions}</h3>
          </div>
          <div className='space-y-3 sm:px-3'> 
          <textarea
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="w-full h-40 p-3 border-2 border-gray-500 rounded-lg resize-none 
            focus:outline-none focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500"
            placeholder={translations[language].placeholder}
          />
        </div>
        </div>

        {/* Submit Button */}
        <div className="sm:flex justify-end">
        <button 
          onClick={handleSubmitClick}
          className="w-full sm:w-32 
          bg-blue-700 font-bold 
          text-white py-3 px-4 rounded-lg 
          hover:bg-blue-600 transition-colors">
          Submit
        </button>
        </div>
      </form>

      {/* Error Modal */}
      <Validation 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmSubmit}
        type={modalType}
      />
    </div>
  );
};

export default FeedbackForm;