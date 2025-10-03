import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaHeart, FaEllipsisH } from "react-icons/fa";

export const Display = () => {
  const { songsData } = useContext(PlayerContext);

  return (
    <div
      className="
        w-full 
        sm:w-96 
        md:w-[28rem] 
        !bg-gradient-to-r 
        !from-black 
        !to-gray-700 
        text-white 
        rounded-xl 
        p-4 
        sm:p-5 
        md:p-6 
        overflow-y-auto
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Top Streams</h1>
      </div>

      {/* Songs List */}
      <div className="space-y-2">
        {songsData.slice(0, 5).map((song, index) => (
          <div
            key={song._id}
            className="
              flex 
              justify-between 
              items-center 
              py-2 
              px-2 
              hover:bg-gray-800 
              rounded-lg 
              cursor-pointer
              transition
            "
          >
            <div className="flex items-center space-x-3">
              {/* Song Index */}
              <p className="text-gray-400 text-xs sm:text-sm w-4">{index + 1}</p>

              {/* Song Image */}
              <img
                src={song.imageUrl || song.imageFilePath || "/fallback-image.jpg"}
                alt={song.title}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg object-cover flex-shrink-0"
              />

              {/* Song Info */}
              <div className="flex flex-col w-[120px] sm:w-[160px] md:w-[200px]">
                <p className="font-semibold text-sm sm:text-base truncate">{song.title}</p>
                <p className="text-xs sm:text-sm text-gray-400 truncate">{song.artist}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 text-lg sm:text-xl">
              <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer transition" />
              <FaEllipsisH className="text-gray-400 cursor-pointer hover:text-white transition" />
            </div>
          </div>
        ))}

        {/* Categories */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-base sm:text-lg font-semibold">Categories</h1>
            <p className="text-red-500 cursor-pointer font-medium hover:text-white text-xs sm:text-sm">
              See all
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
