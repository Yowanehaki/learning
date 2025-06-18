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

    // Jika semua rating sudah diisi, lanjutkan ke pengiriman
    try {
      setShowModal(false);
      
      // Membuat salinan ratings untuk pengiriman
      // dan menghapus personilBackup jika nilainya 0
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
      suggestions: 'Saran & Komentar',
      placeholder: 'Silakan berikan saran atau komentar Anda di sini...'
    },
    EN: {    
      suggestions: 'Suggestions & Comments',
      placeholder: 'Please provide your suggestions or comments here...'
    }
  };

  const FormSection = ({ title, criteria }) => (
    <div className="bg-white rounded-xl border-0 shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-t-xl px-4 sm:px-8 py-6 border-b border-gray-50">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-red-500 to-indigo-600 rounded-full mr-4"></div>
          {title}
        </h3>
      </div>
      <div className="p-4 sm:p-8">
        <div className="space-y-6">
          {criteria.map((item, index) => (
            <div key={item.key} className="group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 px-2 rounded-lg hover:bg-gradient-to-r from-white to-blue-50 transition-colors duration-200 gap-3 sm:gap-0">
                <span className="text-gray-700 font-medium flex-1 pr-0 sm:pr-8 text-base sm:text-lg leading-relaxed">
                  {item.label}
                </span>
                <div className="flex-shrink-0 self-start sm:self-auto">
                  <StarRate 
                    value={ratings[item.key]} 
                    onChange={(value) => handleRatingChange(item.key, value)}
                    error={showErrors && ratings[item.key] === 0}
                  />
                </div>
              </div>
              {index < criteria.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border-0 mb-8 sm:mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-blue-800 px-4 sm:px-8 py-2"></div>
          <div className="flex flex-col items-center justify-between p-4 sm:p-8 lg:flex-row">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
              <div className="w-52 h-24 sm:w-28 sm:h-36 lg:w-60 lg:h-36 flex-shrink-0 rounded-xl p-2">
                <img src={logo} alt="logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  Customer Feedback Form
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                  {language === 'ID' ? 'Penilaian Anda sangat berharga bagi kami' : 'Your feedback is valuable to us'}
                </p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex-shrink-0">
              <LanguageToggle />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitClick} className="space-y-6 sm:space-y-8">
          {/* Sales Section */}
          <FormSection 
            title= 'Sales'
            criteria={salesCriteria}
          />

          {/* Product/License Section */}
          <FormSection 
            title='Product/License'
            criteria={productCriteria}
          />

          {/* Project Manager Section */}
          <FormSection 
            title='Project Manager'
            criteria={projectManagerCriteria}
          />

          {/* Engineer Section */}
          <FormSection 
            title='Engineer'
            criteria={engineerCriteria}
          />

          {/* Implementation & Maintenance Section */}
          <FormSection 
            title='Implementation & Maintenance'
            criteria={implementationMaintenanceCriteria}
          />

          {/* Suggestions Section */}
          <div className="bg-white rounded-xl border-0 shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl px-4 sm:px-8 py-6 border-b border-gray-50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4"></div>
                {translations[language].suggestions}
              </h3>
            </div>
            <div className="p-4 sm:p-8">
              <textarea
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="w-full h-32 sm:h-40 p-4 sm:p-6 border-2 border-gray-100 rounded-xl resize-none 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                placeholder-gray-400 text-gray-700 bg-gray-50 hover:bg-white transition-colors duration-200
                text-based leading-relaxed"
                placeholder={translations[language].placeholder}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="sm:flex justify-end">
        <button 
          onClick={handleSubmitClick}
          className="w-full sm:w-32 
          bg-blue-900 font-bold 
          text-white py-3 px-4 rounded-lg 
          hover:bg-blue-800 transition-colors">
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
    </div>
  );
};

export default FeedbackForm;