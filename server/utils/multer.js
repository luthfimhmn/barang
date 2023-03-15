const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req,file,callback) {
        callback(null, './assets/');
    },
    filename: function(req,file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 100000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})


function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb (null, true)
    } else {
        return cb (null,false)
    }
}

module.exports = upload;