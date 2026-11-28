const multer = require('multer');
const storage = multer.memoryStorage();
const fileFilter = (req,file,next) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.');
        error.status = 400;
        return next(error);
    }

    return next(null, true);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 4 * 1024 * 1024 } }); // Limit file size to 4MB

module.exports = upload;