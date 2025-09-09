import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { MdDelete } from 'react-icons/md'
import { IoIosMicrophone } from 'react-icons/io';

export const MusicCard = ({music, fetchSongs}) => {

  const { backendUrl } = useContext(PlayerContext)

  const audioSrc = `${backendUrl}/${music.filePath}`
  const imageSrc = `${backendUrl}/${music.imageFilePath}`

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-music/${id}`) 
      if(data.success){
        toast.success(data.message)
        fetchSongs()
      }
    } catch (error) {
      console.log(error)
    }
  }

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
          <MdDelete className="text-lg absolute top-4 hover:text-2xl transition-all"/>
        </div>
        <div className="flex items-center justify-start gap-2">
          <IoIosMicrophone />{music.artist}
        </div>
        <p className="text-sm mt-2">
          <span className="text-white text-xs">Uploaded At:</span>{new DataTransfer(music.createdAt).toLocaleStorage()}
        </p>
        <audio controls className="w-full mt-3">
          <source src={audioSrc} className="w-full mt-3"/>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}
