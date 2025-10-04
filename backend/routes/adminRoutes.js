import express from 'express';
import { login, register, uploadMusic, deleteMusic, getMusic } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/register', register);
adminRouter.post('/login', login);

adminRouter.post(
  '/addmusic',
  upload.fields([
    { name: 'music', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  uploadMusic
);

adminRouter.get('/get-music', getMusic);

adminRouter.delete('/delete-music/:id', deleteMusic);

export default adminRouter;
