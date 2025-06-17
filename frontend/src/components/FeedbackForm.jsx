import React, { useState } from 'react';
import StarRate from './starRate'; 
import Validation from './Validation';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { submitFeedback } from '../services/api';

const FeedbackForm = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // check jika ada rating yang kosong
    const hasEmptyRatings = Object.values(ratings).some(rating => rating === 0);
    
    if (hasEmptyRatings) {
      setShowErrors(true); 
      setModalType('warning');
      setShowModal(true);
      // Membersihkan error setelah 6 detik
      setTimeout(() => {
        setShowErrors(false);
      }, 6000);
      return;
    }

    // Menampilkan modal konfirmasi
    setModalType('confirm');
    setShowModal(true);
  };

  // Fungsi untuk menangani konfirmasi submit
  const handleConfirmSubmit = async () => {
    try {
      setShowModal(false);
      
      console.log('Preparing to submit ratings:', ratings);
      
      const response = await submitFeedback({
        ratings,
        suggestions
      });
      
      console.log('Submission successful:', response);
      navigate('/appreciate');
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Failed to submit feedback: ${error.message}`);
    }
  };

  // sales
  const salesCriteria = [
    { key: 'salesPenguasaanProduk', label: 'Penguasaan Produk' },
    { key: 'salesPenampilan', label: 'Penampilan' },
    { key: 'salesKomunikasi', label: 'Komunikasi' },
    { key: 'salesRespon', label: 'Respon' }
  ];

  // product/license
  const productCriteria = [
    { key: 'kesesuaianBarang', label: 'Kesesuaian barang/lisensi yang diterima' },
    { key: 'ketepatanWaktu', label: 'Ketepatan waktu pengiriman' },
    { key: 'kondisiBarang', label: 'Kondisi barang/lisensi' },
    { key: 'kesesuaianJumlah', label: 'Kesesuaian jumlah barang/lisensi' }
  ];

  // project manager
  const projectManagerCriteria = [
    { key: 'pelaksanaanProject', label: 'Pelaksanaan Project' },
    { key: 'pmKoordinasi', label: 'Koordinasi' },
    { key: 'pmPenampilan', label: 'Penampilan' },
    { key: 'pmKomunikasi', label: 'Komunikasi' },
    { key: 'pmRespon', label: 'Respon' },
    { key: 'pmLaporan', label: 'Laporan' }
  ];

  // engineer
  const engineerCriteria = [
    { key: 'kesesuaianKualifikasi', label: 'Kesesuaian Kualifikasi' },
    { key: 'kemampuanTeknis', label: 'Kemampuan Teknis' },
    { key: 'engineerPenampilan', label: 'Penampilan' },
    { key: 'engineerKomunikasi', label: 'Komunikasi' },
    { key: 'engineerRespon', label: 'Respon' },
    { key: 'engineerLaporan', label: 'Laporan' },
    { key: 'personilBackup', label: 'Personil Backup' }
  ];

  // implementation & maintenance
  const implementationMaintenanceCriteria = [
    { key: 'pelaksanaanImplementasi', label: 'Pelaksanaan Implementasi' },
    { key: 'responServiceDesk', label: 'Respon Service Desk' },
    { key: 'pemenuhanSLA', label: 'Pemenuhan SLA' },
    { key: 'layananBantuan', label: 'Layanan Bantuan' },
    { key: 'implLaporan', label: 'Laporan' }
  ];
  
 //Merender komponen
  return (
    <div className="max-w-3xl mx-auto sm:px-15 p-6 bg-white border border-gray-200">
  {/* Header */}
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-20">
    <div className="w-80 h-24 sm:w-80 sm:h-30 flex items-center justify-center">
      <img src={logo} alt="logo" className="w-full h-full object-contain" />
    </div>
    <div className="text-center sm:text-left">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 py-3">FORMULIR UMPAN BALIK</h1>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">PELANGGAN</h2>
    </div>
  </div>

      <form onSubmit={handleSubmit}>
        
        {/* Sales Section */}
        <div className="mb-8">
          <div className="border-b-2 border-gray-800 pb-3 mb-6">
            <h3 className="text-lg font-bold text-gray-800">PENJUALAN</h3>
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
            <h3 className="text-lg font-bold text-gray-800">PRODUK/LISENSI</h3>
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
            <h3 className="text-lg font-bold text-gray-800">MAAEJER PROYEK</h3>
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
            <h3 className="text-lg font-bold text-gray-800">TEKNISI</h3>
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
            <h3 className="text-lg font-bold text-gray-800">IMPLEMENTASI & PEMELIHARAAN</h3>
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
            <h3 className="text-lg font-bold text-gray-800">SARAN</h3>
          </div>
          <div className='space-y-3 sm:px-3'> 
          <textarea
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="w-full h-40 p-3 border-2 border-gray-500 rounded-lg resize-none 
            focus:outline-none focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500"
            placeholder="Silakan berikan saran atau komentar Anda di sini..."
          />
        </div>
        </div>

        {/* Submit Button */}
        <div className="sm:flex justify-end">
        <button 
          onClick={handleSubmit}
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