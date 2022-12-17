const csv = require('csvtojson');
const path = require('path');

async function provinces(req, res, next) {
    try {
        const db_provinsi = path.resolve(__dirname, './data-wilayah/provinces.csv');
        const data = await csv().fromFile(db_provinsi);
        return res.json({
            message: 'Berhasil menampilkan data provinsi', 
            data: data, 
            count: data.length
        }, 200);
    } catch (error) {
        return res.json({
            message: 'Gagal menampilkan data provinsi', 
            data: [], 
            count: 0, 
            error: error.message
        }, 500);
    }
}

async function cities(req, res, next) {
    try {
        const db_kabupaten = path.resolve(__dirname, './data-wilayah/regencies.csv');
        let kode_provinsi = req.query.kode_provinsi;
        const data = await csv().fromFile(db_kabupaten);
        
        if(!kode_provinsi) 
            return res.json({ message: 'Berhasil menampilkan semua data kota',  data: data,  count: data.length }, 200);

        return res.json({
            message: 'Berhasil menampilkan data kota', 
            data: data.filter( kabupaten => kabupaten.kode_provinsi  === kode_provinsi ), 
            count: data.filter( kabupaten => kabupaten.kode_provinsi  === kode_provinsi ).length
        }, 200);
    } catch (error) {
        return res.json({
            message: 'Gagal menampilkan data kota', 
            data: [], 
            count: 0, 
            error: error.message
        }, 500);
    }
}

async function districts(req, res, next) {
    try {
        const db_districts = path.resolve(__dirname, './data-wilayah/districts.csv');
        let kode_kabupaten = req.query.kode_kabupaten;
        const data = await csv().fromFile(db_districts);

        if(!kode_kabupaten) 
            return res.json({ message: 'Berhasil menampilkan semua data kecamatan',  data: data,  count: data.length }, 200);

        return res.json({
            message: 'Berhasil menampilkan data kecamatan', 
            data: data.filter( kecamatan => kecamatan.kode_kabupaten  === kode_kabupaten ), 
            count: data.filter( kecamatan => kecamatan.kode_kabupaten  === kode_kabupaten ).length
        }, 200);
    } catch (error) {
        return res.json({
            message: 'Gagal menampilkan data kecamatan', 
            data: [], 
            count: 0, 
            error: error.message
        }, 500);
    }
}

async function villages(req, res, next) {
    try {
        const db_villages = path.resolve(__dirname, './data-wilayah/villages.csv');
        let kode_kecamatan = req.query.kode_kecamatan;
        const data = await csv().fromFile(db_villages);

        if(!kode_kecamatan) 
            return res.json({ message: 'Berhasil menampilkan semua data kelurahan / desa',  data: data,  count: data.length }, 200);

        return res.json({
            message: 'Berhasil menampilkan data kelurahan / desa', 
            data: data.filter( kelurahan => kelurahan.kode_kecamatan  === kode_kecamatan ), 
            count: data.filter( kelurahan => kelurahan.kode_kecamatan  === kode_kecamatan ).length
        }, 200);
    } catch (error) {
        return res.json({
            message: 'Gagal menampilkan data kelurahan / desa', 
            data: [], 
            count: 0, 
            error: error.message
        }, 500);
    }
}

module.exports = { provinces, cities, districts, villages }
