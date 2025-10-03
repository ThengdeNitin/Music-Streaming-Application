import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { MdDelete } from "react-icons/md";
import { IoIosMicrophone } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const fallbackImage = "https://via.placeholder.com/300x300.png?text=No+Image";

const MusicCard = ({ music, fetchSongs }) => {
  const { backendUrl } = useContext(PlayerContext);

  const audioSrc = music.musicUrl || music.filePath || "";
  const imageSrc = music.imageUrl || music.imageFilePath || "";

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-music/${id}`
      );
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
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden relative w-full h-full">
      {/* Song Image */}
      <div className="relative group">
        <img
          src={imageSrc || fallbackImage}
          alt={music.title}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.target.src = fallbackImage)}
        />
        {/* Delete button */}
        <button
          onClick={() => handleDelete(music._id)}
          aria-label="Delete Song"
          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-600 hover:bg-red-700 p-2 sm:p-2.5 rounded-full shadow-md transition-all duration-300"
        >
          <MdDelete className="text-white text-lg sm:text-xl" />
        </button>
      </div>

      {/* Song Info */}
      <div className="p-3 sm:p-4">
        <h3 className="text-md sm:text-lg md:text-xl font-bold truncate">
          {music.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-gray-300 text-sm sm:text-base">
          <IoIosMicrophone className="text-lg sm:text-xl" />
          <span className="truncate">{music.artist}</span>
        </div>

        {/* Audio Player */}
        {audioSrc && (
          <div className="mt-3 sm:mt-4 bg-gray-700 rounded-lg overflow-hidden">
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
