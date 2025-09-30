import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import MusicCard from "../components/MusicCard";

const ListSong = () => {
  const { songsData, fetchSongs } = useContext(PlayerContext);

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Music Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {songsData.length > 0 ? (
          songsData.map((music) => (
            <MusicCard key={music._id} music={music} fetchSongs={fetchSongs} />
          ))
        ) : (
          <p className="text-center col-span-full">No songs found</p>
        )}
      </div>
    </div>
  );
};

export default ListSong;
