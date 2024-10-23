import React, { useState } from "react";
import { Badge } from "@material-tailwind/react";
import BottomNavBar from "../Navbar/BottomNavBar";

export const NumberComponent = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleBadgeClick = (number) => {
    setSelectedNumber(number);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-overlay") {
      setSelectedNumber(null);
    }
  };

  const handleClosePopup = () => {
    setSelectedNumber(null);
  };

  const badgeBackgroundStyles = (number) => {
    switch (number) {
      case 0:
      case 5:
        return `linear-gradient(to right, red 50%, #f1c232 50%)`;
      case 1:
      case 4:
      case 7:
        return `bg-yellow-700`;
      case 2:
      case 8:
        return `bg-red-600`;
      case 3:
      case 6:
      case 9:
        return `bg-black text-white`;
      default:
        return ``;
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg font-serif max-w-lg mx-auto">
      <div className="mb-6 font-extrabold text-lg sm:text-xl w-full text-center p-1 text-gray-1000">
        Select the Number
      </div>

      {/* First row of badges */}
      <div className="flex justify-between p-2 sm:p-5 gap-3 mx-4 sm:mx-6">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleBadgeClick(index)}
            className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
          >
            <Badge
              className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm font-bold ${badgeBackgroundStyles(index)}`}
              style={index === 0 || index === 5 ? { background: badgeBackgroundStyles(index) } : {}}
              content={index}
            />
          </button>
        ))}
      </div>

      {/* Second row of badges */}
      <div className="flex justify-between mt-4 sm:mt-6 gap-3 p-2 sm:p-5 mx-4 sm:mx-6">
        {[5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleBadgeClick(number)}
            className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
          >
            <Badge
              className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm font-bold ${badgeBackgroundStyles(number)}`}
              style={number === 5 ? { background: badgeBackgroundStyles(number) } : {}}
              content={number}
            />
          </button>
        ))}
      </div>

      {/* Popup Overlay */}
      {selectedNumber !== null && (
        <div
          id="popup-overlay"
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto sm:max-w-md sm:p-6">
            <h2 className="font-bold text-lg mb-3 text-center">{`Join ${selectedNumber}`}</h2>

            {/* Input Field with Submit Button inside */}
            <div className="flex mb-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0"
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 h-[2.5rem] text-sm"
              />
              <button className="bg-blue-500 text-white rounded-r-md px-3 h-[2.5rem]">Recharge</button>
            </div>

            {/* Buttons Below Input Field in one line */}
            <p className="text-sm">Contract Money</p>
            <div className="flex space-x-1 mb-3">
              <button className="flex-1 bg-gray-200 rounded-md py-1 text-sm">10</button>
              <button className="flex-1 bg-gray-200 rounded-md py-1 text-sm">100</button>
              <button className="flex-1 bg-gray-200 rounded-md py-1 text-sm">1000</button>
              <button className="flex-1 bg-gray-200 rounded-md py-1 text-sm">10000</button>
            </div>

            <p className="text-sm">Numbers</p>
            <div className="flex justify-between mb-2">
              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm">-5</button>
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm">-1</button>
              </div>

              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm">+1</button>
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm">+5</button>
              </div>
            </div>

            <p className="text-sm">Total Contract money is 10</p>

            {/* Confirm Button */}
            <div className="flex justify-end mt-3">
              <button
                className="bg-green-500 text-white text-sm rounded-md px-4 py-2 h-[2.5rem]"
                onClick={handleClosePopup}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
};
