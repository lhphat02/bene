import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

// const connectionString = process.env.ATLAS_URI

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
  
  
const upload = multer({ storage: storage });

export default upload;
 