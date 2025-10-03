import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import MusicCard from "../components/MusicCard";

const ListSong = () => {
  const { songsData, fetchSongs } = useContext(PlayerContext);

  return (
    <div className="px-3 sm:px-6 md:px-10 lg:px-16 py-6 h-full">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10">
        🎶 Music Library
      </h1>

      {/* Song Grid */}
      <div className="
        grid 
        grid-cols-1 
        xs:grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-4 sm:gap-6 md:gap-8
      ">
        {songsData.length > 0 ? (
          songsData.map((music) => (
            <MusicCard key={music._id} music={music} fetchSongs={fetchSongs} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-sm sm:text-base">
            No songs found 🎧
          </p>
        )}
      </div>
    </div>
  );
};

export default ListSong;
