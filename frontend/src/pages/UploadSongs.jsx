import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import assets from "../assets";

const UploadSongs = () => {
  const { backendUrl } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [songPreview, setSongPreview] = useState(null);
  const [songsData, setSongsData] = useState({ title: "", artist: "" });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!song || !image) {
      toast.error("Please upload both song and image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", songsData.title);
      formData.append("artist", songsData.artist);
      formData.append("music", song);
      formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-music`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/add-music");
        setSongsData({ title: "", artist: "" });
        setImage(null);
        setSong(null);
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
    <div className="max-h-screen flex items-center justify-center px-2 sm:px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 w-full max-w-xl p-4 sm:p-6 md:p-8 shadow-lg rounded-xl shadow-black text-gray-600"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">
          Upload Songs
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Song Upload */}
          <div className="flex flex-col items-center gap-2 w-full sm:w-1/2">
            <p className="text-sm sm:text-base">Upload Song</p>
            <input
              type="file"
              id="song"
              accept="audio/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                setSong(file);
                if (file) setSongPreview(URL.createObjectURL(file));
              }}
            />
            <label htmlFor="song">
              <img
                src={songPreview || assets.upload_song}
                className="w-24 h-24 sm:w-32 sm:h-32 cursor-pointer object-contain"
                alt="Upload Song"
              />
            </label>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center gap-2 w-full sm:w-1/2">
            <p className="text-sm sm:text-base">Upload Image</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) setImagePreview(URL.createObjectURL(file));
              }}
            />
            <label htmlFor="image">
              <img
                src={imagePreview || assets.upload_area}
                className="w-24 h-24 sm:w-32 sm:h-32 cursor-pointer object-contain"
                alt="Upload Image"
              />
            </label>
          </div>
        </div>

        {/* Song Info Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="title"
            value={songsData.title}
            onChange={onChangeHandler}
            placeholder="Song Name"
            className="w-full p-2.5 rounded-lg outline-none bg-gray-100"
            required
          />
          <input
            type="text"
            name="artist"
            value={songsData.artist}
            onChange={onChangeHandler}
            placeholder="Artist Name"
            className="w-full p-2.5 rounded-lg outline-none bg-gray-100"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-6 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-gray-800 text-sm sm:text-base"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default UploadSongs;
