import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block rounded-xl'/>
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden rounded-xl'/>

      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-black font-poppins text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
         <span className="text-black">Sustainable </span>
         <span className="text-[#174e1f]">Commerce </span>
        <span className="text-black">for Everyone</span>
        </h1>

<p className="mt-4 text-center font-poppins md:text-left text-base md:text-lg text-black max-w-xl">
  Connect with artisans and eco-friendly producers worldwide. Every purchase supports sustainable practices and empowers communities.
</p>

      

      <div className='flex items-center mt-6 font-medium'>
        <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
        Explore Products
        <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
        </Link>

        <Link to={"/producerform"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
        Become a Producer
        <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
        </Link>
      </div>
      </div>
    </div>
  )
}

export default MainBanner
