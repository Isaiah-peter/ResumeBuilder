import React, {useState} from 'react'
import Logo from "../UI/Logo"
import Button from '../UI/Button'
import DownloadButton from './DownloadButton'

const Navbar = () => {
  
    return (
      <div className="sticky top-0 left-0 z-40">
        <nav className="bg-[var(--white)] p-6 shadow-md h-[86px] flex items-center justify-between px-6">
          <Logo />

          <div className="flex items-center gap-3">
            <DownloadButton />
            
            <button className='flex items-center py-2 px-4 border border-[var(--red-primary)] text-[var(--red-primary)] text-md rounded-lg gap-2'>
              <span>Share</span>
              <svg width="18" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                  d="M17.3334 11.302V15.9895C17.3334 19.1746 13.1667 19.1145 9.00008 19.1145C4.83341 19.1145 0.666748 19.1746 0.666748 15.9895V11.302M9.00008 0.885376V13.3854M9.00008 0.885376L13.1667 5.05204M9.00008 0.885376L4.83341 5.05204" 
                  stroke="#EB5757" 
                  strokeOpacity="0.9" 
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </nav>

      </div>
    )
}

export default Navbar