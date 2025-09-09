import logo from '../assets/play.png'
import bird from '../assets/bird.jpg'
import { IoMdHome } from 'react-icons/io'
import { BsGridiX2 } from 'react-icons/bs'
import { CiHeart } from 'react-icons/ci'
import { CiHeadphones } from 'react-icons/ci'

export const SideBar = () => {
  return (
    <div className='bg-gradient-to-l from-black to-gray-700'>
      <div className='mt-3 py-p px-2'>
        <img src={logo} className='mt-1 w-44 hidden md:block cursor-pointer'/>
        <img src={bird} className='mt-1 w-12 block md:hidden cursor-pointer' />
      </div>
      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <IoMdHome className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Home</p>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <BsGridiX2 className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Brower</p>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <CiHeart className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Favorite</p>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <CiHeadphones className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Library</p>
        </div>
      </div>
    </div>
  )
}
