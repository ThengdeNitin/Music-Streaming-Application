import { useContext, useRef, useState } from "react"
import { FaPlay, FaPause } from 'react-icons/fa'
import { PlayerContext } from '../context/PlayerContext'

export const NewReleases = (setCurrentSongImage, setCurrentSongTitle, setCurrentSongArtist) => {

  const { songsData, backendUrl } = useContext(PlayerContext)
  const [playingSong, setPlayingSong] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [durtion, setDuration] = useState(0)

  const audioRef = useRef(new Audio())

  const handelPlayClick = (song) => {
    if(playingSong._id === song._id){
      return;
    }

    if(audioRef.current){
      audioRef.current.pause()
    }

    audioRef.current.src = `${backendUrl}/${song.filePath}`;
    audioRef.current.play()
    setPlayingSong(song)

    //Set the current and duration for process tracking
    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    }
    audioRef.current.ontimeupadate = () => {
      setDuration(audioRef.current.currentTime)
    }

    const imageUrl = `${backendUrl}/${song.imageFilePath}.replace(/\\/g, '/)`
    setCurrentSongImage(imageUrl)
    setCurrentSongTitle(song.title)
    setCurrentSongArtist(song.artist)
  }

  const handlePauseClick = () => {
    if(audioRef.current){
      audioRef.current.pause();
      setPlayingSong(null);

      setCurrentSongImage(null)
    setCurrentSongTitle(null)
    setCurrentSongArtist(null)
    }
  }

  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    if(audioRef.current){
      audioRef.current.volume = volume / 10
    }
  }

  const handleProgressClick = (e) => {
    if(audioRef.current){
      const progressBar = e.target;
      const newTime = (e.clientX - progressBar.getBoundingCLientRect().left) / progressBar.offSetWidth * durtion;
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <div className="mt-3 py-2 px-2 mb-16">
      <div className="flex flex-row justify-between items-center text-white">
        <h1 className="text-lg font-bold">New Releases</h1>
        <p className="text-sm text-red-500 hover:text-white cursor-pointer not-odd:mr-2">See More</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        { songsData.map((release) => (
          <div key={release._id} className="relativem group::">
            <img 
            src={`${backendUrl}/${release.imageFilePath}`} className="w-full h-40 object-cover object-top rounded-lg" />
            <div className="absolute h-40 w-full insert-0 flex items-end py-2 px-2 right-4 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <button className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600"
              onClick={() => playingSong._id === release._id ? handlePauseClick() : handelPlayClick()}>
                {playingSong._id === release._id ? (<FaPause/>) : (<FaPlay/>)}
              </button>
            </div>
             
             <div className="mt-2">
              <p className="text-white font-semibold">{release.title}</p>
              <p className="text-gray-400 text-sm">{release.artist}</p>
             </div>

             { playingSong._id === release._id && (
              <div className="bottom-4 w-full flex items-center justify-between z-10">
                <label htmlFor="volume" 
                className="text-white">
                  volume
                </label>
                <input 
                id = "volume"
                type="range"
                onClick={handleVolumeChange}
                min='0'
                max="100"
                defaultChecked="100"
                className="w-16 h-0.5"
                />
              </div>
             )}

             { playingSong._id === release._id && (
              <div className="w-full mt-2 h-0.5 cursor-pointer" onClick={handleProgressClick}>
                style = {{ background: `linear-gradient(to right, #ff0000 ${(currentTime / durtion) * 100}%, #fff 0%)`}}
              </div>
             )}
          </div>
        ))}
      </div>
    </div>
  )
}
