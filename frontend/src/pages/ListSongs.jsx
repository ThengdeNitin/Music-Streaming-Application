import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import MusicCard from "../components/MusicCard";

const ListSong = () => {
  const { songsData, fetchSongs } = useContext(PlayerContext);

  return (
    <div className="px-2 sm:px-4 md:px-6 py-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
        Music Library
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {songsData.length > 0 ? (
          songsData.map((music) => (
            <MusicCard key={music._id} music={music} fetchSongs={fetchSongs} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            No songs found
          </p>
        )}
      </div>
    </div>
  );
};

export default ListSong;
