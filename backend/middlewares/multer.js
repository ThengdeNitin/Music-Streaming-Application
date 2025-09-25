import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedAudio = ['.mp3', '.wav'];
  const allowedImage = ['.jpg', '.jpeg', '.png', '.webp'];

  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === 'music') {
    if (allowedAudio.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid audio file type. Only .mp3 or .wav allowed.'));
    }
  } else if (file.fieldname === 'image') {
    if (allowedImage.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image file type. Only .jpg, .jpeg, .png, .webp allowed.'));
    }
  } else {
    cb(new Error('Invalid field name'));
  }
};

// Export multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // max 20MB per file
});

export default upload;
