import React, { useEffect, useState, useContext } from 'react'
import Background from '../component/Background.jsx'
import Product from './Product.jsx'
import OurPolicy from '../component/OurPolicy.jsx'
import NewLetterBox from '../component/NewLetterBox.jsx'
import Footer from '../component/Footer.jsx'
import { userDataContext } from '../contaxt/UserContext.jsx'

function Home() {
  const { userData } = useContext(userDataContext); // ✅ check login
  let [heroCount, setHeroCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let intervalId;
    if (!intervalId) {
      intervalId = setInterval(() => {
        setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, []);

  // ✅ Show popup after 15 sec (only if not logged in)
  useEffect(() => {
    if (!userData) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, [userData]);

  // ✅ Auto hide popup after 15 sec
  useEffect(() => {
    if (showPopup) {
      const hideTimer = setTimeout(() => {
        setShowPopup(false);
      }, 15000); // 15 seconds
      return () => clearTimeout(hideTimer);
    }
  }, [showPopup]);

  return (
    <div className='overflow-x-hidden relative top-[70px]'>

      {/* background only */}
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] relative'>
        <Background heroCount={heroCount} />
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />

      {/* ✅ Popup */}
      {showPopup && !userData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-2">Please Login</h2>
            <p className="text-gray-600 mb-4">
              To access more items and features, please log in to your account.
            </p>
            <a
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login Now
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
