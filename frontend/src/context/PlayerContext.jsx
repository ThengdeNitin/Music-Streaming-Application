import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const backendUrl = `http://localhost:2000`;
  const [songsData, setSongsData] = useState([]);

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-music`);
      if (data.success) {
        setSongsData(data.music);
      }
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const values = {
    backendUrl,
    songsData,
    fetchSongs,
  };

  return (
    <PlayerContext.Provider value={values}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
