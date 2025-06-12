const FEEDBACK_CATEGORIES = {
  SALES: 1,
  ENGINEER: 2,
  PROJECT_MANAGER: 3,
  PRODUCT_LICENSE: 4,
  IMPLEMENTATION_MAINTENANCE: 5
};

// Mapping untuk nilai description berdasarkan key di frontend
const FEEDBACK_MAPPING = {
  // Sales (Category 1)
  salesPenguasaanProduk: { category: 1, description: 1 },
  salesPenampilan: { category: 1, description: 2 },
  salesKomunikasi: { category: 1, description: 3 },
  salesRespon: { category: 1, description: 4 },

  // Product/License (Category 4)
  kesesuaianBarang: { category: 4, description: 12 },
  ketepatanWaktu: { category: 4, description: 13 },
  kondisiBarang: { category: 4, description: 14 },
  kesesuaianJumlah: { category: 4, description: 15 },

  // Project Manager (Category 3)
  pelaksanaanProject: { category: 3, description: 10 },
  pmKoordinasi: { category: 3, description: 11 },
  pmPenampilan: { category: 3, description: 2 },
  pmKomunikasi: { category: 3, description: 3 },
  pmRespon: { category: 3, description: 4 },
  pmLaporan: { category: 3, description: 8 },

  // Engineer (Category 2)
  kesesuaianKualifikasi: { category: 2, description: 5 },
  kemampuanTeknis: { category: 2, description: 6 },
  engineerPenampilan: { category: 2, description: 2 },
  engineerKomunikasi: { category: 2, description: 3 },
  engineerRespon: { category: 2, description: 4 },
  engineerLaporan: { category: 2, description: 8 },
  personilBackup: { category: 2, description: 9 },

  // Implementation & Maintenance (Category 5)
  pelaksanaanImplementasi: { category: 5, description: 16 },
  responServiceDesk: { category: 5, description: 17 },
  pemenuhanSLA: { category: 5, description: 18 },
  layananBantuan: { category: 5, description: 19 },
  implLaporan: { category: 5, description: 8 }
};

const FEEDBACK_DESCRIPTIONS = {
  // Sales & Common
  PENGUASAAN_PRODUK: 1,
  PENAMPILAN: 2,
  KOMUNIKASI: 3,
  RESPON: 4,
  
  // Engineer specific
  KESESUAIAN_KUALIFIKASI: 5,
  KEMAMPUAN_TEKNIS: 6,
  LAPORAN: 8,
  PERSONIL_BACKUP: 9,
  
  // Project Manager specific
  PELAKSANAAN_PROJECT: 10,
  KOORDINASI: 11,
  
  // Product/License specific
  KESESUAIAN_BARANG: 12,
  KETEPATAN_WAKTU: 13,
  KONDISI_BARANG: 14,
  KESESUAIAN_JUMLAH: 15,
  
  // Implementation & Maintenance specific
  PELAKSANAAN_IMPLEMENTASI: 16,
  RESPON_SERVICE_DESK: 17,
  PEMENUHAN_SLA: 18,
  LAYANAN_BANTUAN: 19
};

const RATING_RANGE = {
  MIN: 1,
  MAX: 5
};

const ERROR_MESSAGES = {
  INVALID_RATING: 'Rating harus antara 1 dan 5',
  REQUIRED_FIELD: 'Semua field harus diisi',
  INVALID_ID_FORM: 'ID Form tidak valid',
  DB_CONNECTION_ERROR: 'Koneksi database error',
  FEEDBACK_NOT_FOUND: 'Feedback tidak ditemukan'
};

module.exports = {
  FEEDBACK_CATEGORIES,
  FEEDBACK_DESCRIPTIONS,
  FEEDBACK_MAPPING,
  RATING_RANGE,
  ERROR_MESSAGES
};