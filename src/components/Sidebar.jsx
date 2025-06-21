import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import CartItem from './CartItem';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div
      className={`${
        isOpen ? 'right-0' : 'left-full'
      } w-full bg-white fixed top-[80px] h-[calc(100vh-80px)] shadow-2xl md:w-[30vw] xl:max-w-[450px] transition-all duration-250 z-20 px-4 lg:px-[35px]`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>
          Number of items ({cart.length})
        </div>
        <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl' />
        </div>
      </div>

      <div className='flex flex-col gap-y-2 h-[60%] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

      <div className='flex flex-col gap-y-3 mt-[-10]'>
        <div className='flex w-full justify-between items-center'>
          <div className='uppercase font-semibold'>
          </div>
          <div
            onClick={clearCart}
            className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'
          >
            <FiTrash2 />
          </div>
        </div>

        <Link
          to='/Invoice'
          className='bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium'
        >
          Invoice
        </Link>

        <button
          onClick={handleCheckout}
          className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium'
        >
          Buy  ${parseFloat(total).toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
