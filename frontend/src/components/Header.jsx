import { useState } from "react";
import { NewReleases } from "./NewReleases";

const Header = () => {
  const [currentSongImage, setCurrentSongImage] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState(null);
  const [currentSongArtist, setCurrentSongArtist] = useState(null);

  return (
    <header
      className="
        relative 
        bg-cover 
        bg-no-repeat 
        bg-center 
        h-56 
        sm:h-72 
        md:h-96 
        lg:h-[28rem] 
        flex 
        items-center 
        justify-center 
        text-white
      "
      style={{
        backgroundImage: `url(${
          currentSongImage ||
          "https://www.koimoi.com/wp-content/new-galleries/2021/12/allu-arjuns-action-drama-pushpa-trailer-unveiled-001.jpg"
        })`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {currentSongTitle && currentSongArtist && (
        <div
          className="
            absolute 
            text-center 
            max-w-[70%] 
            sm:max-w-[70%] 
            lg:max-w-[50%] 
            px-3 sm:px-6
          "
        >
          <p
            className="
              text-lg 
              sm:text-2xl 
              md:text-4xl 
              lg:text-5xl 
              font-extrabold 
              mb-1 sm:mb-2 
              drop-shadow-lg 
              truncate
            "
          >
            {currentSongTitle}
          </p>
          <p
            className="
              text-xs 
              sm:text-base 
              md:text-lg 
              lg:text-xl 
              text-gray-300 
              font-medium 
              drop-shadow-md 
              truncate
            "
          >
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
