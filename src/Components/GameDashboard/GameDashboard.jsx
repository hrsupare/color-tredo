import React, { useState } from "react";
import CountdownTimer from "../CountDown/CountDownTimer";

const GameDashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [inputValue, setInputValue] = useState(""); 

  const handleButtonClick = (color) => {
    setButtonColor(color); 
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-overlay") {
      handleClosePopup();
    }
  };

  return (
    <div className="text-black p-4 bg-white shadow-xl rounded-xl font-serif max-w-md sm:max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="mx-3">
          <p className="font-bold text-lg sm:text-md">Periods</p>
          <p className="font-semibold text-2xl sm:text-xl">971447</p>
        </div>
        <div className="mx-3 text-center">
          <p className="font-bold text-md sm:text-sm">Count Down</p>
          <CountdownTimer />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        {/* Red Button */}
        <div className="flex-1">
          <button
            className="bg-gradient-to-r from-red-600 to-red-400 w-full h-[3rem] sm:h-[2.5rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-red-400"
            onClick={() => handleButtonClick("Join Red")}
          >
            <span className="text-white font-semibold text-md sm:text-sm">Join Red</span>
          </button>
        </div>

        {/* Yellow Button */}
        <div className="flex-1">
          <button
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 w-full h-[3rem] sm:h-[2.5rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            onClick={() => handleButtonClick("Join Yellow")}
          >
            <span className="text-white font-semibold text-md sm:text-sm">Join Yellow</span>
          </button>
        </div>

        {/* Black Button */}
        <div className="flex-1">
          <button
            className="bg-black w-full h-[3rem] sm:h-[2.5rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            onClick={() => handleButtonClick("Join Black")}
          >
            <span className="text-white font-semibold text-md sm:text-sm">Join Black</span>
          </button>
        </div>
      </div>

      {/* Popup Component */}
      {isPopupVisible && (
        <div
          id="popup-overlay"
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="p-4 sm:p-3 bg-white shadow-xl rounded-xl font-serif max-w-lg sm:max-w-xs mx-auto">
            <h2 className="font-bold text-lg sm:text-md mb-4 text-center">{buttonColor}</h2>

            {/* Input Field with Submit Button inside */}
            <div className="flex mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 h-[3rem] sm:h-[2.5rem]"
              />
              <button className="bg-blue-500 text-white rounded-r-lg px-4 h-[3rem] sm:h-[2.5rem]">Recharge</button>
            </div>

            {/* Contract Money Buttons */}
            <p className="text-sm sm:text-xs">Contract Money</p>
            <div className="flex space-x-1 mb-4">
              <button className="flex-1 bg-gray-200 rounded-lg py-1 text-sm sm:text-xs">10</button>
              <button className="flex-1 bg-gray-200 rounded-lg py-1 text-sm sm:text-xs">100</button>
              <button className="flex-1 bg-gray-200 rounded-lg py-1 text-sm sm:text-xs">1000</button>
              <button className="flex-1 bg-gray-200 rounded-lg py-1 text-sm sm:text-xs">10000</button>
            </div>

            {/* Numbers Buttons */}
            <p className="text-sm sm:text-xs">Numbers</p>
            <div className="flex justify-between mb-2">
              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-lg py-1 w-12 sm:w-10 text-sm sm:text-xs">-5</button>
                <button className="bg-gray-200 rounded-lg py-1 w-12 sm:w-10 text-sm sm:text-xs">-1</button>
              </div>
              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-lg py-1 w-12 sm:w-10 text-sm sm:text-xs">+1</button>
                <button className="bg-gray-200 rounded-lg py-1 w-12 sm:w-10 text-sm sm:text-xs">+5</button>
              </div>
            </div>

            <p className="text-sm sm:text-xs">Total Contract money is 10</p>

            {/* Confirm Button */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white text-md sm:text-sm rounded-lg px-4 py-2 h-[3rem] sm:h-[2.5rem]"
                onClick={handleClosePopup}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDashboard;
