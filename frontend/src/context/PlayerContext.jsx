import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {

  const backendUrl = "http://localhost:2000"

  const [songsData, setSongsData] = useState([])

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-music`)
      setSongsData( data.music)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const values = {
     backendUrl,
     songsData,
     fetchSongs
  }

  return(
    <PlayerContextProvider value={values}>
      { children }
    </PlayerContextProvider>
  )
}

export default PlayerContextProvider;