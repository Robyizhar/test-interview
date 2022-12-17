// import package `mongoose`
const mongoose = require('mongoose');

// ambil module `model` dan `Schema` dari package `mongoose`
const { model, Schema } = mongoose;

const BannerSchema = Schema({
    title: {
        type: String, 
        minlength: [3, 'Panjang nama minimal 3 karakter'],
        required: [true, 'Nama banner harus diisi'],
        maxlength: [50, 'Panjang nama maksimal 50 karakter']
    },
    description: {
        type: String, 
        maxlength: [100, 'Panjang deskripsi maksimal 100 karakter']
    },
    link: {
        type: String, 
        maxlength: [1000, 'Panjang link maksimal 1000 karakter']
    }, 
    is_active: {
        type: Number, 
        default: 0
    },
    image_url: String,
    
}, {timestamps: true});

module.exports = model('Banner', BannerSchema);