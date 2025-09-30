import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { MdDelete } from "react-icons/md";
import { IoIosMicrophone } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const MusicCard = ({ music, fetchSongs }) => {
  const { backendUrl } = useContext(PlayerContext);

  // Prefer Cloudinary URLs if available
  const audioSrc = music.musicUrl || music.filePath || "";
  const imageSrc = music.imageUrl || music.imageFilePath || "";

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-music/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchSongs();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete music");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      {/* Song Image */}
      <div className="relative group">
        <img
          src={imageSrc}
          alt={music.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.target.src = "/fallback-image.jpg")} // fallback if broken
        />
        {/* Delete button */}
        <button
          onClick={() => handleDelete(music._id)}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md transition-all duration-300"
        >
          <MdDelete className="text-white text-lg" />
        </button>
      </div>

      {/* Song Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{music.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-gray-300">
          <IoIosMicrophone className="text-xl" />
          <span className="truncate">{music.artist}</span>
        </div>

        {/* Audio Player */}
        {audioSrc && (
          <div className="mt-4 bg-gray-700 rounded-lg overflow-hidden">
            <audio controls className="w-full">
              <source src={audioSrc} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicCard;
