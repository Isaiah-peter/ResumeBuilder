import React, {useState} from 'react'
import Logo from "../UI/Logo"
import menu from '../../assets/landingpage/menu.svg'
import cancel from '../../assets/landingpage/cancel.svg'
import Button from '../UI/Button'

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    return (
      <div className="sticky top-0 left-0 z-40">
        <nav className="bg-[var(--white)] p-6 shadow-md h-[86px] hidden sm:flex items-center justify-between px-6">
          <Logo />
          <div className="flex space-x-6">
            <a href="#features" className="text-[var(--gray-dark)] text-[18px] hover:text-[var(--red-primary)] text-[var(--red-primary)]">Home</a>
            <a href="#pricing" className="text-[var(--gray-dark)] text-[18px] hover:text-[var(--red-primary)]">Template</a>
            <a href="#contact" className="text-[var(--gray-dark)] text-[18px] hover:text-[var(--red-primary)]">Jobs</a>
            <a href="#contact" className="text-[var(--gray-dark)] text-[18px] hover:text-[var(--red-primary)]">About</a>
          </div>

          <Button className='font-semibold' children={"Get Stated"} />
        </nav>

        <nav className="bg-[var(--white)] p-6 shadow-md h-[86px] sm:hidden flex items-center justify-between px-6">
          <Logo />

          <img src={menu} alt="menu" onClick={handleMenuToggle} className="cursor-pointer" />

          <div className={`bg-[var(--black)] absolute top-0 right-0 w-full h-screen flex-col items-center justify-center space-y-6 z-50 ${isMenuOpen ? 'flex' : 'hidden'}`}>
            <img src={cancel} onClick={handleMenuToggle} alt="cancel" className="absolute top-6 right-6 cursor-pointer" />
            <a href="#features" onClick={handleMenuToggle} className="text-[18px] hover:text-[var(--red-primary)] text-[var(--red-primary)]">Home</a>
            <a href="#pricing" onClick={handleMenuToggle} className="text-[var(--white)] text-[18px] hover:text-[var(--red-primary)]">Template</a>
            <a href="#contact" onClick={handleMenuToggle} className="text-[var(--white)] text-[18px] hover:text-[var(--red-primary)]">Jobs</a>
            <a href="#contact" onClick={handleMenuToggle} className="text-[var(--white)] text-[18px] hover:text-[var(--red-primary)]">About</a>
          </div>
        </nav>
      </div>
    )
}

export default LandingNavbar