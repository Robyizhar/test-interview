const router = require('express').Router();
// require multer
const multer = require('multer');
// require os
const os = require('os');
// import product controller 
const Controller = require('./controller'); 

router.get('/', Controller.index);
router.post('/store', multer({dest: os.tmpdir()}).single('image'), Controller.store);
router.get('/detail/:id', Controller.detail);
router.post('/update', multer({dest: os.tmpdir()}).single('image'), Controller.update);
router.delete('/destroy/:id', Controller.destroy);

module.exports = router;