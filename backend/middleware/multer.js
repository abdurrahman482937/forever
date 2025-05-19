import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (_, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

export default upload;
