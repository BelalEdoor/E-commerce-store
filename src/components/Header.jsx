import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.jpeg';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // Scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b
         border-white/10 transition-all duration-300 ${
        isActive ? 'py-3 shadow-md' : 'py-6'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between h-full'>
        <Link to={'/react-tailwind-ecommerce-website-project'}>
          <img className='w-[40px]' src={Logo} alt='logo' />
        </Link>
<p className='text-black text-center text-2xl font-playfair'>
  E-commerce-store
</p>        

        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
          <BsBag className='text-2xl' />
          <div className='bg-red-500 absolute right-2 bottom-2 text-[12px] w-[18px] h-[18px]
           text-white rounded-full justify-center items-center flex'>
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
