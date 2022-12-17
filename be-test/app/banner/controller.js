const Model = require('./model');
const config = require('../config');

// Package Upload File
const fs = require('fs');
const path = require('path');

async function index(req, res, next) {
    // if(!req.user)
    //     return res.json({ status: 401, message: `Your're not login or token expired` });

    try {

        let { limit = 10, skip = 0, q = '' } = req.query;
        let title = {};

        if (q.length)
            title = { ...title, title: {$regex: `${q}`, $options: 'i'} }

        let count = await Model.find(title).countDocuments();
        let data = await Model
            .find(title)
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        return res.json({
            status: 200,
            message: 'Berhasil Menampilkan data banner',
            data: data, 
            count: count, 
            limit: limit,
            skip: skip

        }, 200)

    } catch (error) {
        return res.json({
            status: 500,
            message: 'Gagal Menampilkan data banner, Hubungi Administrator',
            data: []
        }, 500);
    }
}

async function store(req, res, next) {
    // if(!req.user)
    //     return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let payload = req.body;

        if (payload.is_active == true) {
            payload = {...payload, is_active: 1};
            await Model.updateMany({}, { $set: { is_active: 0 } });
        } else {
            payload = {...payload, is_active: 0};
        }
        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/banners/${filename}`);
            const src = fs.createReadStream(tmp_path); 
            const dest = fs.createWriteStream(target_path); 
            src.pipe(dest); 
            src.on('end', async () => {
                try {
                    let data = new Model({...payload, image_url: `images/banners/${filename}`});
                    await data.save();
                    return res.json({
                        status: 200,
                        message: 'Berhasil menyimpan data banner',
                        data: data
                    }, 200);
                } catch (error) {
                    fs.unlinkSync(target_path);
                    if(error && error.name === 'ValidationError')
                        return res.json({  status: 422, error: 1, message: error.message, fields: error.errors, data: req.body }, 422);
                    
                    return res.json({
                        status: 500,
                        message: 'Gagal menyimpan data banner',
                        data: [], 
                        error: error
                    }, 500);
                }
            }); 
            src.on('error', async() => {
                return res.json({
                    status: 500,
                    message: 'Gagal menyimpan data banner',
                    data: []
                }, 500);
            });
        } else {
            let data = new Model(payload);
            await data.save();
            return res.json({
                status: 200,
                message: 'Berhasil menyimpan data banner',
                data: data
            }, 200);
        }
    } catch (error) {
        if(error && error.name === 'ValidationError'){
            return res.json({ 
                error: 1, 
                message: error.message, 
                fields: error.errors, 
                data: req.body 
            }, 422);
        }
        return res.json({
            status: 500,
            message: 'Gagal menyimpan data banner',
            data: [], 
            error: error.message
        }, 500);
    }
}

async function detail(req, res, next) {
    // if(!req.user)
    //     return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let data = await Model.findOne({_id: req.params.id});

        if(data)
            return res.json({ 
                status: 200, 
                data: data, 
                message: 'Berhasil Menampilkan data banner',
            });
        
        return res.json({ data: null, edit: false }, 200);
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Gagal Menampilkan data banner',
            data: []
        }, 500);
    }
}

async function getActive(req, res, next) {
    // if(!req.user)
    //     return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let data = await Model.findOne({is_active: 1});

        if(data)
            return res.json({ data: data, edit: true }, 200);
        
        return res.json({ data: null, edit: false }, 404);
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Gagal Menampilkan data banner',
            data: []
        }, 500);
    }
}

async function update(req, res, next) {
    // if(!req.user)
    //     return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let payload = req.body;
        if (payload.is_active && payload.is_active == 1){
            payload = {...payload, is_active: 1};
            await Model.updateMany({}, { $set: { is_active: 0 } });
        } else {
            payload = {...payload, is_active: 0};
        }
        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/banners/${filename}`);
            const src = fs.createReadStream(tmp_path); 
            const dest = fs.createWriteStream(target_path); 
            src.pipe(dest); 
            src.on('end', async () => {
                try {
                    let data = await Model.findOne({_id: payload._id});
                    let currentImage = `${config.rootPath}/public/${data.image_url}`;
                    if(fs.existsSync(currentImage))
                        fs.unlinkSync(currentImage);
                    
                    data = await Model.findOneAndUpdate({_id: payload._id}, {...payload, image_url: `images/banners/${filename}`}, {new: true, runValidators: true});
                    return res.json({
                        status: 200,
                        message: 'Berhasil mengubah data banner',
                        data: data
                    }, 200);
                } catch (error) {
                    fs.unlinkSync(target_path);
                    if(error && error.name === 'ValidationError')
                        return res.json({ error: 1, message: error.message, fields: error.errors, data: req.body, edit: true }, 402);
                    
                    return res.json({
                        status: 500,
                        message: 'Gagal Menampilkan data banner',
                        data: []
                    }, 500);
                }
            });
            src.on('error', async() => {
                return res.json({
                    status: 500,
                    message: 'Gagal Menampilkan data banner',
                    data: []
                }, 500);
            });
            
        } else {
            let data = await Model.findOneAndUpdate({_id: payload._id}, payload, {new: true, runValidators: true});
            return res.json({
                status: 200,
                message: 'Berhasil mengubah data banner',
                data: data
            }, 200);
        }
    } catch (error) {
        if(error && error.name === 'ValidationError'){
            return res.json({
                error: 1, 
                message: error.message, 
                fields: error.errors, 
                data: req.body, 
                edit: true
            }, 500);
        }
        return res.json({
            status: 500,
            message: 'Gagal Menampilkan data banner',
            data: [], 
            error: error
        }, 500);
    }
}

async function destroy(req, res, next) {
    // if(!req.user)
    //     return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let data = await Model.findOne({_id: req.params.id});
        
        if (!data) 
            return res.json({ error: 1, message: "Can't Delete Data Not Found" }, 404);

        if (data.is_active == 1) 
            return res.json({ error: 1, message: "Can't Delete Banner is Active" }, 200);

        await Model.findOneAndDelete({_id: req.params.id});
        
        let currentImage = `${config.rootPath}/public/${data.image_url}`;
        if(fs.existsSync(currentImage))
            fs.unlinkSync(currentImage)
        
        return res.json({
            status: 200,
            message: 'Berhasil menghapus data banner',
            data: data
        }, 200);
    } catch(error) {
        return res.json({
            status: 500,
            message: 'Gagal Menampilkan data banner',
            data: [], 
            error: error
        }, 500);
    }
}

module.exports = { index, store, detail, update, destroy, getActive }
