import { useState } from "react";
import { NewReleases } from "./NewReleases";

const Header = () => {
  const [currentSongImage, setCurrentSongImage] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState(null);
  const [currentSongArtist, setCurrentSongArtist] = useState(null);

  return (
    <header
      className="relative bg-cover bg-no-repeat bg-top h-64 sm:h-80 md:h-96 flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${
          currentSongImage ||
          "https://www.koimoi.com/wp-content/new-galleries/2021/12/allu-arjuns-action-drama-pushpa-trailer-unveiled-001.jpg"
        })`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Song Info */}
      {currentSongTitle && currentSongArtist && (
        <div className="absolute text-center px-4 sm:px-8">
          <p className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-lg truncate">
            {currentSongTitle}
          </p>
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 font-medium drop-shadow-lg truncate">
            {currentSongArtist}
          </p>
        </div>
      )}

      {/* New Releases Component */}
      <NewReleases
        setCurrentSongImage={setCurrentSongImage}
        setCurrentSongTitle={setCurrentSongTitle}
        setCurrentSongArtist={setCurrentSongArtist}
      />
    </header>
  );
};

export default Header;
