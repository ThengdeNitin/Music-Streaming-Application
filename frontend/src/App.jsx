import { Route, Routes, useLocation } from "react-router-dom";
import { SideBar } from "./components/SideBar.jsx";
import { SideBarAdmin } from "./components/SideBar-Admin.jsx";
import { Display } from "./components/Display";
import UploadSong from './pages/UploadSongs.jsx';
import ListSongs from './pages/ListSongs.jsx';
import Header from './components/Header.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const adminPaths = ["/add-music", "/list-songs"];
  const isAdminPage = adminPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col sm:flex-row h-screen">
        {/* Sidebar / Topbar */}
        {isAdminPage ? (
          <SideBarAdmin />
        ) : (
          <SideBar />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col sm:flex-row">
          {isAdminPage ? (
            <div className="flex-1 overflow-y-auto p-2">
              <Routes>
                <Route path="/add-music" element={<UploadSong />} />
                <Route path="/list-songs" element={<ListSongs />} />
              </Routes>
            </div>
          ) : (
            <>
              {/* Header + Display */}
              <div className="flex-1 flex flex-col sm:flex-row bg-black">
                <div className="flex-1 sm:flex-1 overflow-y-auto">
                  <Header />
                </div>

                {/* Display section */}
                <div className="flex-1 sm:flex-[0.35] bg-black p-2">
                  <Display />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
