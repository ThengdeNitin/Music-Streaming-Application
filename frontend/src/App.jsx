import { Route, Routes, useLocation } from "react-router-dom"
import { SideBar } from "./components/Sidebar.jsx"
import { SideBarAdmin } from "./components/Sidebar-Admin.jsx"
import { Display } from "./components/Display"
import UploadSong from './pages/UploadSongs.jsx'
import ListSongs from './pages/ListSongs.jsx'
import Header from './components/Header.jsx'
import Display from "./components/Display"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {

  const location = useLocation()
  const adminPaths = ["/add-music", "/list-songs"]
  const isAdminPage = adminPaths.includes(location.pathname)

  return (
    <>
      <div className="flex relative h-screen">
        <ToastContainer />
        { isAdminPage ? (
          <>
          <SideBarAdmin />
          <div className="flex-1 overflow-y-scroll">
            <Routes>
               <Route path="/add-music" element={<UploadSong/>}/>
               <Route path="/list-song" element={<ListSongs/>}/>
            </Routes>
          </div>
          </>
        ) : (
          <>
          <SideBar/>
          <div className="flex-1 bg-black overflow-y-scroll">
            <Header/>
          </div>
          <div className="flex-2 bg-black hidden lg:block p-2">
             <Display/>
          </div>
          </>
        )} 
      </div>
    </>
  )
}

export default App
