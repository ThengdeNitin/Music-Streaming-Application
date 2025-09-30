import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedAudio = ['.mp3', '.wav'];
  const allowedImage = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = '.' + file.originalname.split('.').pop().toLowerCase();

  if (file.fieldname === 'music') {
    allowedAudio.includes(ext) ? cb(null, true) : cb(new Error('Invalid audio file type. Only .mp3 or .wav allowed.'));
  } else if (file.fieldname === 'image') {
    allowedImage.includes(ext) ? cb(null, true) : cb(new Error('Invalid image file type. Only .jpg, .jpeg, .png, .webp allowed.'));
  } else {
    cb(new Error('Invalid field name'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } 
});

export default upload;
