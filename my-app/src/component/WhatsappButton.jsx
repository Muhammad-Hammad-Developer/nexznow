import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  const phoneNumber = "923132655006"; // Apna number yahan likho
  const message = "Hello! I want to know more about your services."; // Default message

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed 
        bottom-6 
        right-6 
        sm:bottom-6 
        sm:right-6 
        bottom-[80px] md:bottom-6  /* Mobile pe upar, md+ pe normal */
        bg-green-500 
        text-white 
        p-4 
        rounded-full 
        shadow-lg 
        hover:bg-green-600 
        transition 
        duration-300 
        z-50
      "
    >
      <FaWhatsapp size={32} />
    </a>
  );
}

export default WhatsAppButton;
