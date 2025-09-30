import React, { useContext, useState } from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Google from "../assets/google.png";

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utills/Firebase';
import { authDataContext } from '../contaxt/AuthContext';

function Registration() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");   // ✅ Fixed casing
  const [password, setPassword] = useState(""); // ✅ Fixed casing

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        serverUrl + '/api/auth/registration',
        { name, email, password }, // ✅ Sending correct keys
        { withCredentials: true }
      );
      console.log(result.data);
      // Optional: redirect after successful signup
      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

const googleSignup = async ()=>{
  try {
    const respone = await signInWithPopup(auth,provider)
let user = respone.user
let name = user.displayName;
let email = user.email

const result = await axios.post(serverUrl + "/api/auth/googlelogin",{name,email},{withCredentials:true})
console.log(result.data);


  navigate("/login");



  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l  text-white flex flex-col items-center justify-start'>
      <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer bg-black' onClick={() => navigate("/")}>
        <img className='w-[90px]' src={Logo} alt="logo" />
      
      </div>

      <div className='w-full h-screen flex items-center justify-start flex-col gap-[10px] pt-10 text-black'>
        <span className='text-lg font-semibold '>Registration Page</span>
        <span className='text-[16px]'>Welcome to Nexzen, place your order</span>
      </div>

      <div className="w-full min-h-screen overflow-x-hidden flex justify-center items-start pt-10 bg-gradient-to-l ">
        <div className="max-w-[600px] w-full h-[500px]  border backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
          <form onSubmit={handleSignUp} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
            <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignup}>
              <img src={Google} alt="" className='w-[40px]' /> Registration with Google
            </div>

            <div className="flex items-center justify-center w-full gap-4">
              <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
              <span className="text-black">OR</span>
              <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>

            <div className='w-[90%] flex flex-col items-center justify-center gap-[15px]'>
              <input
                type="text"
                className='w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[black] text-black px-[20px] font-semibold'
                placeholder='Username'
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="text"
                className='w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[black] text-black px-[20px] font-semibold'
                placeholder='Email'
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="w-full relative">
                <input
                  type={show ? "text" : "password"}
                  className='w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[black] px-[20px] text-black pr-[45px] font-semibold'
                  placeholder='Password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {!show && (
                  <FaRegEye
                    className='absolute right-[15px] top-[50%] translate-y-[-50%] text-bllack cursor-pointer text-black'
                    onClick={() => setShow(prev => !prev)}
                  />
                )}
                {show && (
                  <FaEye
                    className='absolute right-[15px] top-[50%] translate-y-[-50%] text-black cursor-pointer'
                    onClick={() => setShow(prev => !prev)}
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-[90%] h-[50px] bg-[#6767f5] text-black rounded-lg backdrop-blur-sm shadow-lg font-semibold hover:bg-[#6161ad] transition-all duration-300"
            >
              Create Account
            </button>

            <p className='flex gap-[10px] text-black'>
              You have an account?
              <span
                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer '
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
