import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { LuContact } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { userDataContext } from '../contaxt/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { shopDataContext } from '../contaxt/ShopContext.jsx';
import { authDataContext } from '../contaxt/AuthContext.jsx';

function Navigation() {
  const { getCurrentUser, userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch ,getCartCount } = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);

      // Clear context immediately
      setUserData(null);

      // Optionally refresh current user
      // await getCurrentUser();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[70px] bg-black z-10 fixed top-0 flex items-center px-[30px] shadow-md shadow-gray-800">
      
      {/* Left Section: Logo */}
      <div className="flex items-center gap-[10px] flex-none">
        <img src={logo} alt="NumSports Logo" className="w-[100px] h-[100px]" />
      </div>

      {/* Center Section: Navigation Menu */}
      <div className="custom-nav flex-1 hidden md:flex justify-center">
        <ul className="flex items-center gap-[19px] text-white">
          <li className="text-[15px] hover:bg-gray-800 cursor-pointer py-[10px] px-[20px] rounded-2xl" onClick={()=>navigate("/")}>Home</li>
          <li className="text-[15px] hover:bg-gray-800 cursor-pointer py-[10px] px-[20px] rounded-2xl" onClick={()=>navigate("/collection")}>Collection</li>
          <li className="text-[15px] hover:bg-gray-800 cursor-pointer py-[10px] px-[20px] rounded-2xl" onClick={()=>navigate("/about")}>About</li>
          <li className="text-[15px] hover:bg-gray-800 cursor-pointer py-[10px] px-[20px] rounded-2xl" onClick={()=>navigate("/contact")}>Contact</li>
        </ul>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center justify-end gap-[25px] text-white text-[24px] flex-none ml-auto">
        {/* Search Icon Toggle */}
        <div className="cursor-pointer">
          {!showSearch ? (
            <IoSearchCircleOutline
              className="w-[38px] h-[38px] text-white"
              onClick={() => { setShowSearch(true); navigate("/collection"); }}
            />
          ) : (
            <IoSearchCircle
              className="w-[38px] h-[38px] text-white"
              onClick={() => setShowSearch(false)}
            />
          )}
        </div>

        {/* Profile Icon / User Initial */}
        <div className="cursor-pointer" onClick={() => setShowProfile(prev => !prev)}>
          {!userData ? (
            <FaUserCircle className="w-[30px] h-[30px] text-white" />
          ) : (
            <div className="w-[30px] h-[30px] bg-white text-black rounded-full flex items-center justify-center text-[14px] font-bold">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Cart Icon with Badge */}
        <div className="relative cursor-pointer hidden md:block" >
          <MdOutlineShoppingCart className="w-[30px] h-[30px] text-white"  onClick={()=>navigate("/cart")}/>
          <p className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-white text-black rounded-full text-[9px]">
            {getCartCount()}
          </p>
        </div>
      </div>

      {/* Animated Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 80, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-gray-900 absolute top-[100%] left-0 right-0 flex items-center justify-center overflow-hidden"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="lg:w-[50%] w-[80%] h-[60%] bg-black border border-gray-600 rounded-[30px] px-[50px] placeholder:text-gray-400 text-white text-[18px]"
              placeholder="Search Here"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-black text-white top-[110%] right-[4%] border border-slate-600 rounded-[10px] z-10 shadow-md">
          <ul>
            {!userData && (
              <li
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer" 
              onClick={() => {
                navigate("/order");
                setShowProfile(false);
              }}
            >Orders</li>
            <li
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                navigate("/about");
                setShowProfile(false);
              }}
            >
              About
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-black text-white text-[12px] md:hidden shadow-[0_-2px_5px_rgba(0,0,0,0.5)]'>
        <button className='flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/")}> 
          <IoMdHome className='w-[25px] h-[25px]'/>Home
        </button>
        <button className='flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/collection")}> 
          <HiOutlineCollection className='w-[25px] h-[25px]'/>Collection
        </button>
        <button className='flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/contact")}> 
          <LuContact className='w-[25px] h-[25px]'/>Contact
        </button>
        <button className='flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/cart")}> 
          <MdOutlineShoppingCart className='w-[25px] h-[28px]'/> Cart
        </button>
        <p className=' absolute w-[18px] h-[18px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>
          {getCartCount()}
        </p>
      </div>
    </div>
  );
}

export default Navigation;
