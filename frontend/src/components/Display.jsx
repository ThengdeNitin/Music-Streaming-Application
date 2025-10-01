import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaHeart, FaEllipsisH } from "react-icons/fa";

export const Display = () => {
  const { songsData } = useContext(PlayerContext);

  return (
    <div className="w-full sm:h-full sm:w-96 md:w-116 bg-gradient-to-r from-black to-gray-700 text-white rounded-xl p-3 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mt-3 py-2 px-2">
        <h1 className="font-bold text-md sm:text-lg">Top Streams</h1>
      </div>

      {/* Songs List */}
      <div className="mt-3 overflow-y-auto space-y-2">
        {songsData.slice(0, 5).map((song, index) => (
          <div
            key={song._id}
            className="flex flex-row justify-between items-center py-2 px-2 hover:bg-gray-800 rounded-lg cursor-pointer"
          >
            <div className="flex flex-row items-center space-x-3">
              <p className="text-gray-400">{index + 1}</p>

              <img
                src={song.imageUrl || song.imageFilePath || "/fallback-image.jpg"}
                alt={song.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />

              <div className="flex flex-col">
                <p className="font-semibold text-sm sm:text-base truncate">{song.title}</p>
                <p className="text-xs sm:text-sm text-gray-400 truncate">{song.artist}</p>
              </div>
            </div>

            <div className="flex flex-row items-center space-x-3">
              <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
              <FaEllipsisH className="text-gray-400 cursor-pointer" />
            </div>
          </div>
        ))}

        {/* Categories */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg text-white font-medium">Categories</h1>
            <p className="text-red-500 cursor-pointer font-medium hover:text-white text-sm">
              See all
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
