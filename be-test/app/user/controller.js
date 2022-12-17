const Model = require('./model');
const config = require('../config');

// Package Upload File
const fs = require('fs');
const path = require('path');

async function index(req, res, next) {
    if(!req.user)
        return res.json({ error: 1, message: `Your're not login or token expired` });
        
    try {
        var perPage = req.query.limit || 6
        var page = req.query.page || 1 
        let data = await Model.find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .sort({_id: 'desc'})

        return res.json({
            status: 200,
            message: 'Berhasil Menampilkan data user',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

async function store(req, res, next) {
    if(!req.user)
        return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let payload = req.body;
        let data = new Model(payload);
        await data.save();
        return res.json({
            status: 200,
            message: 'Berhasil menyimpan data user',
            data: data
        });
    } catch (error) {
        if(error && error.name === 'ValidationError'){
            return res.json({
                status: 402,
                message: error.message, 
                fields: error.errors, 
                data: req.body
            });
        }
        next(error);
    }
}

async function detail(req, res, next) {
    if(!req.user)
        return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let data = await Model.findOne({_id: req.params.id});
        return res.json({
            status: 200,
            message: 'Berhasil menampilkan data user',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    if(!req.user)
        return res.json({ error: 1, message: `Your're not login or token expired` });

    // return res.json({ data: req.body, })
    try {
        let payload = req.body;
        if (req.password == 'password') {
            delete payload.password;
        }
        let data = await Model.findOneAndUpdate({_id: payload._id}, payload, {new: true, runValidators: true});
        return res.json({
            status: 200,
            message: 'Berhasil mengubah data user',
            data: data
        });

    } catch (error) {
        if(error && error.name === 'ValidationError'){
            return res.json({
                status: 402,
                message: error.message, 
                fields: error.errors, 
                data: req.body, 
            });
        }
        next(error);
    }
    
}

async function destroy(req, res, next) {
    if(!req.user)
        return res.json({ error: 1, message: `Your're not login or token expired` });

    try {
        let data = await Model.findOneAndDelete({_id: req.params.id});
        if (!data) {
            return res.json({
                error: 1,
                message: "Can't Delete Data Not Found", 
                data: []
            });
        }
        // let currentImage = `${config.rootPath}/public/images/users/${data.image_url}`;
        // if(fs.existsSync(currentImage)){
        //     fs.unlinkSync(currentImage)
        // }
        return res.json({
            status: 200,
            message: 'Berhasil menghapus data user',
            data: data
        });
    } catch(error) {
        next(error);
    }
}

module.exports = { index, store, detail, update, destroy }