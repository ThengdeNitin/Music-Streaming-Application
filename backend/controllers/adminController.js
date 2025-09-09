import adminModel from '../models/adminModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import musicModel from '../models/musicModel.js'
import path from 'path'

const register = async(req, res) =>{
  try {
    const {username, email, password} = req.body

    if(!username || !email || !password){
      return res.status(400).json({ success: false, message: "All fields are required"})
    }

    const existingUser = await adminModel.findOne({ email })
    if(existingUser){
      return res.status(409).json({ success: false, message: "User already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new adminModel({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save();

    const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn : '7d'})

    res.cookie(token, {
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    }

    return res.status(201).json({ success: true, message: "Registered Successfully", user: userResponse, token})

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error"})
  }
}

const login = async(req, res) => {
  try {
    
    const { email, password } = req.body

    if(!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required"})
      }
      
      const user = await adminModel.findOne({ email })
      if(!user){
        return res.status(409).json({ success: false, message: "User not found"})
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if(!isPasswordValid){
        return res.status(401).json({ success: false, message: "Invalid Credentiasls"})
      } 

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn : '7d'})

      res.cookie(token, {
        httpOnly: false, 
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      const userResponse = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }

      return res.status(200).json({ success: true, message: "Login successfully", user:userResponse, token})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal server error"})
  }
}

const uploadMusic = async (req, res) => {
  try {
    const { title, artist } = req.body;
    
    if(!title || !artist){
      return res.status(400).json({ success: false, message: "All fields are required"})
    }

    const musicFile = req.files.music?.[0];
    const imageFile = req.files.images?.[0];

    if(!musicFile){
      return res.status(400).json({ success: false, message: "Image file is required"})
    }

    const allowedExtensions = ['.mp3', '.wav', '.jpg', '.jpeg','.png', '.webp'];
    const musicExt = path.extname(musicFile.originalname).toLowerCase()
    const imageExt = path.extname(imageFile.originalname).toLowerCase()

    if(!allowedExtensions.includes(musicExt) || !allowedExtensions.includes(imageExt)){
      return res.status(400).json({ success: false, message: "Invalid file type. Only audio (.mp3, .wav) and image (.jpg, .jpeg, .png) files are allowed."});
    }

    const filePath = musicFile.path
    const imageFilePath = imageFile.path

    const music = new musicModel({
      title,
      artist,
      filePath,
      imageFilePath
    })

    await music.save()

    return res.status(201).json({ success: true, message: "Musicn uploaded successfully", music})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal server error"})
  }
}

const getMusic = async (req, res) => {
  try {
    const musics = await musicModel.find();
    if(!musics){
      return res.json({ success: false, message: "No songs found"})
    }

    res.json({ success: false, message: 'Internal server error'})
  } catch (error) {
     console.log(error)
     return res.status(500).json({ success: false, message: "Internal server error"})  
  }
}

const deleteMusic = async (req, res) => {
  try {
    
    const { id } = req.params;

    const music = await musicModel.findByIdAndDelete(id);
    if(!music){
      return res.json({ success: false, message:"Music not found"});
    } 
    
    res.status(200).json({ success: true, message:"Music Deleted Successfully", music})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message:"Internal Server Error", music})
  }
  } 

export { register, login, uploadMusic, getMusic, deleteMusic }