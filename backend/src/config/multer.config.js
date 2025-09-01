const multer = require('multer');
const path = require('path');




// multer storage (local). Swap with cloud (e.g., S3) in production.
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
module.exports = upload;
