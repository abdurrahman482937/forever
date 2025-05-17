import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione ea
            vitae veniam maiores facere aperiam molestiae, corrupti corporis
            natus, quibusdam nihil temporibus maxime cum? Similique error optio
            quod voluptatibus accusamus, aut excepturi maxime ipsum quos.
            Consectetur repudiandae aliquam cumque maxime quasi temporibus
            maxime unde.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+880 1730-260970</li>
            <li>abdurrahman@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ forever - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
