const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;
const errorHandler = require('./middlewares/errorHandler.js')
const routes = require('./routes')

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(routes);
app.use('/assets', express.static("assets"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`This application is running on port ${PORT}`));

/*
    POIN UTAMA
    1. Format foto barang yang diizinkan hanya JPG dan PNG, dan ukurannya maksimal 100KB. V
    2. Nama barang harus unik. V        
    3. Harga beli, harga jual dan stok hanya boleh diisi dengan angka. V
    4. Semua validasi diatas diproses di backend (API) V

    POIN TAMBAHAN
    1.Tampilan data barang mempunyai pagination dan searching.
    2. Form barang menggunakan popup.
    3. Metode autentikasi menggunakan JWT antara Frontend & Backend (API)
*/