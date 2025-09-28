import logo from '../assets/play.png'
import bird from '../assets/bird.png'
import { IoIosAddCircle } from 'react-icons/io'
import { IoMdMusicalNote } from 'react-icons/io'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'

export const SideBarAdmin = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-gradient-to-t from-black to-gray-500 min-h-screen space-x-16 p-[1vw] items-center flex flex-col'>
      <img src={logo} onClick={() => navigate('/')} className='mt-1 w-44 hidden md:block cursor-pointer'/>
      <img src={bird} onClick={() => navigate('/')} className='mt-1 w-44 block md:hidden cursor-pointer'/>

      <div className='flex flex-col items-center gap-5 mt-10 py-2 px-2'>
        <NavLink to={'/add-music'} className='flex items-center gap-2 text-white text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-700 py-3 px-3'>
          <IoIosAddCircle className='w-12 h-12 text-xl font-medium'/>
          <p>Add Music</p>
        </NavLink>
        <NavLink to={'/list-songs'} className='flex items-center gap-2 text-white text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-700 py-3 px-3'>
        <IoMdMusicalNote className='w-12 h-12 text-xl font-medium'/>
          <p>List Of Songs</p>
        </NavLink>
      </div>
    </div>
  )
}
