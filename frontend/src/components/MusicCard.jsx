import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { MdDelete } from "react-icons/md";
import { IoIosMicrophone } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const MusicCard = ({ music, fetchSongs }) => {
  const { backendUrl } = useContext(PlayerContext);

  const audioSrc = `${backendUrl}/${music.filePath.replace(/\\/g, '/')}`;
  const imageSrc = `${backendUrl}/${music.imageFilePath.replace(/\\/g, '/')}`;  

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-music/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        fetchSongs();
        console.log(data);
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete music");
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-400 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform relative">
      <img
        src={imageSrc}
        alt={music.title}
        className="w-full h-40 object-cover object-top hover:scale-105 transition-all duration-300"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold truncate">{music.title}</h3>
          <MdDelete
            onClick={() => handleDelete(music._id)}
            className="text-xl cursor-pointer hover:text-red-500 absolute top-4 right-4 transition-all"
          />
        </div>
        <div className="flex items-center justify-start gap-2 mt-2">
          <IoIosMicrophone />
          <span>{music.artist}</span>
        </div>
        <p className="text-sm mt-2">
          <span className="text-white text-xs">Uploaded At: </span>
          {music.createdAt ? new Date(music.createdAt).toLocaleString() : "N/A"}
        </p>
        <audio controls className="w-full mt-3">
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default MusicCard