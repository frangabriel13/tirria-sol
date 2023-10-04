const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tirria',
    allowedFormats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: cloudinaryStorage });


module.exports = upload;