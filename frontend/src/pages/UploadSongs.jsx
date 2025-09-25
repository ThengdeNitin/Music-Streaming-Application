import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import assets from "../assets"; // Make sure this exists

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
    <div className="h-screen flex items-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col max-h-screen gap-8 text-gray-600 w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 shadow-lg rounded-xl shadow-black"
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Song Upload */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm md:text-base">Upload Songs</p>
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
                className="w-24 h-24 md:h-32 cursor-pointer object-contain"
                alt="Upload Song"
              />
            </label>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm md:text-base">Upload Image</p>
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
                className="w-24 h-24 md:w-32 md:h-32 cursor-pointer object-contain"
                alt="Upload Image"
              />
            </label>
          </div>

          {/* Song Title */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title" className="text-sm md:text-base">
              Song Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={songsData.title}
              onChange={onChangeHandler}
              className="bg-transparent w-full p-2.5 rounded-lg outline-none"
              placeholder="Song Name"
              required
            />
          </div>

          {/* Artist Name */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="artist" className="text-sm md:text-base">
              Artist Name
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={songsData.artist}
              onChange={onChangeHandler}
              className="bg-transparent w-full p-2.5 rounded-lg outline-none"
              placeholder="Artist Name"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-sm md:text-base bg-black text-white py-2 px-6 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-gray-800"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default UploadSongs;
