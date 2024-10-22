import React from "react";
import { Badge } from "@material-tailwind/react";
import BottomNavBar from "../Navbar/BottomNavBar";

export const NumberComponent = () => {
  const numbersArray = Array.from({ length: 10 }, (_, index) => index);
  console.log(numbersArray);

  const handleBadgeClick = (number) => {
    console.log(`Badge ${number} clicked`);
    // Add additional logic if needed
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg font-serif">
      <div className="mb-6 font-extrabold text-xl w-full text-center p-1 text-gray-1000">
        Select the Number
      </div>

      <div className="flex justify-between p-5 mx-6 gap-3">
        <button
          onClick={() => handleBadgeClick(0)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge
            className="h-10 w-10 text-sm font-bold"
            style={{ background: `linear-gradient(to right, red 50%, #f1c232 50%)` }}
            content={0}
          />
        </button>
        <button
          onClick={() => handleBadgeClick(1)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-yellow-700 h-10 w-10 text-sm font-bold" content={1} />
        </button>
        <button
          onClick={() => handleBadgeClick(2)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-red-600 h-10 w-10 text-sm font-bold" content={2} />
        </button>
        <button
          onClick={() => handleBadgeClick(3)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-black h-10 w-10 text-sm font-bold text-white" content={3} />
        </button>
        <button
          onClick={() => handleBadgeClick(4)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-yellow-700 h-10 w-10 text-sm font-bold" content={4} />
        </button>
      </div>

      <div className="flex justify-between mt-6 mx-6 gap-3 p-5">
        <button
          onClick={() => handleBadgeClick(5)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge
            className="h-10 w-10 text-sm font-bold"
            style={{ background: `linear-gradient(to right, red 50%, #f1c232 50%)` }}
            content={5}
          />
        </button>
        <button
          onClick={() => handleBadgeClick(6)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-black h-10 w-10 text-sm font-bold text-white" content={6} />
        </button>
        <button
          onClick={() => handleBadgeClick(7)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-yellow-700 h-10 w-10 text-sm font-bold" content={7} />
        </button>
        <button
          onClick={() => handleBadgeClick(8)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-red-600 h-10 w-10 text-sm font-bold" content={8} />
        </button>
        <button
          onClick={() => handleBadgeClick(9)}
          className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
        >
          <Badge className="bg-black h-10 w-10 text-sm font-bold text-white" content={9} />
        </button>
      </div>
      <BottomNavBar />
    </div>
  );
};
