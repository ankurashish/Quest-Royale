import React, { useState } from "react";

const Navbar = () => {
  const [hoverIndex, setHoverIndex] = useState(0); // Home by default
  const links = ["Home", "About", "Services", "Portfolio", "Contact"];
  const linkWidth = 105;

  const handleMouseLeave = () => {
    setHoverIndex(0); // Return to Home when mouse leaves navbar
  };

  return (
    <div className="flex items-center justify-center ">
      <nav
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center w-[515px] h-[50px] bg-[#222] rounded-lg"
      >
        {links.map((label, index) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onMouseEnter={() => setHoverIndex(index)}
            className="relative text-white text-base px-[27px] z-10 transition-all duration-200"
          >
            {label}
          </a>
        ))}

        <span
          className="absolute top-0 left-0 h-full w-[95px] rounded-lg bg-gradient-to-r from-[#2e3192] to-[#1bffff] transition-all duration-300 ease-in-out"
          style={{ left: `${hoverIndex * linkWidth}px` }}
        ></span>
      </nav>
    </div>
  );
};

export default Navbar;
