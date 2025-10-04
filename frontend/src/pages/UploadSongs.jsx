import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import assets from "../assets";

const UploadSongs = () => {
  const { backendUrl } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [songsData, setSongsData] = useState({ title: "", artist: "" });
  const [songBase64, setSongBase64] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [songPreview, setSongPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!songBase64 || !imageBase64) {
      toast.error("Please upload both song and image!");
      return;
    }

    try {
      const payload = {
        title: songsData.title,
        artist: songsData.artist,
        music: songBase64,
        image: imageBase64,
      };

      const { data } = await axios.post(`${backendUrl}/api/admin/add-music`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        navigate("/add-music");
        setSongsData({ title: "", artist: "" });
        setImageBase64("");
        setSongBase64("");
        setImagePreview(null);
        setSongPreview(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred, Song not uploaded");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSongsData({ ...songsData, [name]: value });
  };

  return (
    <div className="h-full flex items-center justify-center px-3 sm:px-6 py-8 bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 w-full max-w-md sm:max-w-xl md:max-w-2xl p-5 sm:p-8 md:p-10 bg-white shadow-lg rounded-2xl text-gray-700"
      >
        <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-center">
          Upload Your Music 🎵
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6">
          <div className="flex flex-col items-center gap-3 w-full sm:w-1/2">
            <p className="text-sm sm:text-base font-medium">Upload Song</p>
            <input
              type="file"
              id="song"
              accept="audio/*"
              hidden
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  setSongPreview(URL.createObjectURL(file));
                  const base64 = await convertToBase64(file);
                  setSongBase64(base64);
                }
              }}
            />
            <label htmlFor="song">
              <img
                src={songPreview || assets.upload_song}
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 cursor-pointer object-contain border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition"
                alt="Upload Song"
              />
            </label>
          </div>

          <div className="flex flex-col items-center gap-3 w-full sm:w-1/2">
            <p className="text-sm sm:text-base font-medium">Upload Image</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                  const base64 = await convertToBase64(file);
                  setImageBase64(base64);
                }
              }}
            />
            <label htmlFor="image">
              <img
                src={imagePreview || assets.upload_area}
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 cursor-pointer object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition"
                alt="Upload Cover"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="title"
            value={songsData.title}
            onChange={onChangeHandler}
            placeholder="Song Title"
            className="flex-1 p-3 rounded-lg outline-none bg-gray-100 focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="artist"
            value={songsData.artist}
            onChange={onChangeHandler}
            placeholder="Artist Name"
            className="flex-1 p-3 rounded-lg outline-none bg-gray-100 focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2.5 px-6 md:py-3 md:px-10 rounded-lg shadow-md hover:bg-gray-800 transition text-sm sm:text-base font-medium"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default UploadSongs;
