import { useContext, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { PlayerContext } from "../context/PlayerContext";

const fallbackImage = "https://via.placeholder.com/300x300.png?text=No+Image";

export const NewReleases = ({
  setCurrentSongImage,
  setCurrentSongTitle,
  setCurrentSongArtist,
}) => {
  const { songsData } = useContext(PlayerContext);
  const [playingSong, setPlayingSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  const handlePlayClick = (song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentTime(0);
      setDuration(0);
    }

    audioRef.current.src = song.filePath;
    audioRef.current.play();
    setPlayingSong(song);

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    setCurrentSongImage(song.imageFilePath);
    setCurrentSongTitle(song.title);
    setCurrentSongArtist(song.artist);
  };

  const handlePauseClick = () => {
    if (audioRef.current) audioRef.current.pause();
    setPlayingSong(null);
    setCurrentSongImage(null);
    setCurrentSongTitle(null);
    setCurrentSongArtist(null);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) audioRef.current.volume = e.target.value / 10;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || duration === 0) return;
    const progressBar = e.currentTarget;
    const newTime =
      ((e.clientX - progressBar.getBoundingClientRect().left) /
        progressBar.offsetWidth) *
      duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="mt-12 py-2 px-2 mb-16">
      <div className="flex justify-between items-center text-white">
        <p className="text-sm sm:text-base text-red-500 hover:text-white cursor-pointer">
        New Release
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4 ml-2">
        {songsData.map((song) => (
          <div key={song._id} className="relative group">
            <div className="relative">
              <img
                src={song.imageFilePath || fallbackImage}
                alt={song.title}
                className="w-full h-40 sm:h-48 md:h-56 lg:h-60 xl:h-64 object-cover object-top rounded-lg"
                onError={(e) => (e.target.src = fallbackImage)}
              />
              {/* Overlay Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  aria-label={
                    playingSong && playingSong._id === song._id
                      ? "Pause Song"
                      : "Play Song"
                  }
                  className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600 transition-all duration-300"
                  onClick={() =>
                    playingSong && playingSong._id === song._id
                      ? handlePauseClick()
                      : handlePlayClick(song)
                  }
                >
                  {playingSong && playingSong._id === song._id ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </button>
              </div>
            </div>

            {/* Song Info */}
            <div className="mt-2 flex justify-between items-center">
              <div className="truncate">
                <p className="text-white font-semibold truncate">{song.title}</p>
                <p className="text-gray-400 text-sm sm:text-base truncate">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Active Player Controls */}
            {playingSong && playingSong._id === song._id && (
              <>
                <div className="w-full flex items-center justify-between mt-2">
                  <label
                    htmlFor="volume"
                    className="text-white text-sm sm:text-base"
                  >
                    Volume
                  </label>
                  <input
                    id="volume"
                    type="range"
                    onChange={handleVolumeChange}
                    min="0"
                    max="10"
                    defaultValue="10"
                    className="w-20 sm:w-28 cursor-pointer"
                  />
                </div>

                {/* Progress Bar */}
                <div
                  className="w-full mt-2 h-1 cursor-pointer rounded bg-gray-600"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-1 rounded bg-red-500"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
