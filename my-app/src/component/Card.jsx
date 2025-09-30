import React, { useContext, useState, useEffect } from "react";
import { shopDataContext } from "../contaxt/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaSearchPlus } from "react-icons/fa";

function Card({ name, image, id, price }) {
  let { currency } = useContext(shopDataContext);
  let navigate = useNavigate();
  const [showZoom, setShowZoom] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 🚫 Scroll lock jab modal open ho
  useEffect(() => {
    if (showZoom) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showZoom]);

  // ✅ Close Modal with Spin
  const handleClose = () => {
    setIsClosing(true); // spin start
    setTimeout(() => {
      setShowZoom(false);
      setIsClosing(false); // reset state
    }, 500); // 0.5s ke baad modal band
  };

  return (
    <>
      {/* Product Card */}
      <div
        className="w-[300px] max-w-[90%] h-[400px] 
        backdrop-blur-lg rounded-lg  
        flex flex-col items-start justify-start p-[10px] cursor-pointer
        transform transition-all duration-300 ease-out 
        hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]
        animate-[fadeUp_0.6s_ease-out]  relative"
      >
        {/* Image Wrapper */}
        <div
          className="overflow-hidden rounded-sm w-full h-[80%]"
          onClick={() => navigate(`/productdetail/${id}`)}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-110"
          />
        </div>

        {/* Zoom Icon */}
        <button
          onClick={() => setShowZoom(true)}
          className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
        >
          <FaSearchPlus size={18} />
        </button>

        {/* Product Info */}
        <div className="text-[black] text-[18px] py-[10px] font-medium tracking-wide">
          {name}
        </div>
        <div className="text-[black] text-[14px] font-light">
          {currency} {price}
        </div>
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-auto">
          <div className="relative p-4">
            <img
              src={image}
              alt={name}
              className="max-h-screen max-w-screen object-contain rounded-lg"
            />
            {/* Close Button with Spin */}
            <button
              onClick={handleClose}
              className={`absolute top-5 right-5 bg-black/70 text-white p-3 rounded-full hover:bg-red-600 transition-transform duration-500 ${
                isClosing ? "rotate-[360deg]" : ""
              }`}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
