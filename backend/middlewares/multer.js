import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
     cb(null, Date.now() + '_' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.mp3', '.wav', '.jpg', '.jpeg','.png','.webp'];
  const ext = path.extname(file.originalname).toLocaleLowerCase();
  const isMimeTypeVaild = file.mimetype.startWith('audio/') || file.mimetype.startWith('image/')

  if(isMimeTypeVaild && isExtensionVaild){
     cd(null, true)
  } else {
    cb(new Error("Invalid file type. Only audio (,mp3, .wav) and image (.jpg, .jpeg, .png) files are allowed"))
  }
}

const upload = multer({
  storage,
  fileFilter
})

export default upload