import connectDB from "../../config/mongoDB.js";
import Song from "../../models/Song.js"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB(); 
    const songs = await Song.find({});
    res.status(200).json({ songs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
