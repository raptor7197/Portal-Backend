import React from 'react';
import iste from '../images/ISTE.png';
import { FaAngleDown } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="hero min-h-screen bg-base-200 flex flex-col justify-center items-center" data-theme="night">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            ISTE-VIT PROJECTS
          </h1>
          <img src={iste} alt="logo" className="mx-auto mb-6" />
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <a href="#projects" style={{ color: 'white' }} className="flex items-center justify-center">
            <FaAngleDown className="text-5xl animate-bounce" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
