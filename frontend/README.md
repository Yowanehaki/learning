# Customer Feedback Form Frontend

Aplikasi form feedback pelanggan berbasis React + Vite.

## Prasyarat

- Node.js versi 16 atau lebih baru
- NPM atau Yarn sebagai package manager

## Instalasi

1. Clone repository ini
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
# atau
yarn install
```

3. Setup environment variable
Buat file `.env` di root folder dan isi dengan:
```
VITE_API_URL=http://localhost:3000/api
```

## Menjalankan Aplikasi

1. Mode Development
```bash
npm run dev
# atau
yarn dev
```

2. Mode Production
```bash
npm run build
npm run preview
# atau
yarn build
yarn preview
```

Aplikasi akan berjalan di `http://localhost:5173`

## Fitur

- Form feedback dengan 5 kategori penilaian
- Rating bintang 1-5 untuk setiap kriteria
- Kolom saran/komentar
- Validasi form
- Konfirmasi submit
- Halaman terima kasih

## Struktur Folder

```
src/
├── assets/         # Gambar dan aset statis
├── components/     # Komponen React
├── services/       # Service API
└── routing/        # Router setup
```

## Tech Stack

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React
