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
    <div className="text-black p-4 bg-white shadow-xl rounded-xl font-serif max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="mx-3">
          <p className="font-bold text-lg sm:text-xl">Periods</p>
          <p className="font-semibold text-2xl sm:text-3xl">971447</p>
        </div>
        <div className="mx-3 text-center">
          <p className="font-bold text-md sm:text-lg">Count Down</p>
          <CountdownTimer />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        {/* Red Button */}
        <div className="flex-1">
          <button
            className="bg-gradient-to-r from-red-600 to-red-400 w-full h-[3rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-red-400"
            onClick={() => handleButtonClick("Join Red")}
          >
            <span className="text-white font-semibold text-md">Join Red</span>
          </button>
        </div>

        {/* Yellow Button */}
        <div className="flex-1">
          <button
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 w-full h-[3rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            onClick={() => handleButtonClick("Join Yellow")}
          >
            <span className="text-white font-semibold text-md">Join Yellow</span>
          </button>
        </div>

        {/* Green Button */}
        <div className="flex-1">
          <button
            className="bg-black w-full h-[3rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            onClick={() => handleButtonClick("Join Black")}
          >
            <span className="text-white font-semibold text-md">Join Black</span>
          </button>
        </div>
      </div>

      {/* Popup Component */}
      {isPopupVisible && (
        <div
          id="popup-overlay"
          className="fixed inset-0 flex items-center justify-center z-50  bg-gray-800 bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="p-8 bg-white shadow-xl rounded-xl font-serif max-w-lg mx-auto">
            <h2 className="font-bold text-lg mb-4 text-center">{buttonColor}</h2>

            {/* Input Field with Submit Button inside */}
            <div className="flex mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0"
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 h-[3rem]"
              />
              <button className="bg-blue-500 text-white rounded-r-lg px-4 h-[3rem]">Recharge</button>
            </div>

            {/* Buttons Below Input Field in one line */}
            <p>Contract Money</p>
            <div className="flex space-x-1 mb-4">
              <button className="flex-1 bg-gray-200 rounded-lg py-1">10</button>
              <button className="flex-1 bg-gray-200 rounded-lg py-1">100</button>
              <button className="flex-1 bg-gray-200 rounded-lg py-1">1000</button>
              <button className="flex-1 bg-gray-200 rounded-lg py-1">10000</button>
            </div>

            <p>Numbers</p>
            <div className="flex justify-between mb-2">
              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-lg py-1 w-12">-5</button>
                <button className="bg-gray-200 rounded-lg py-1 w-12">-1</button>
              </div>

              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-lg py-1 w-12">+1</button>
                <button className="bg-gray-200 rounded-lg py-1 w-12">+5</button>
              </div>
            </div>


            <p>Total Contract money is 10</p>


            {/* Confirm Button */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white text-md rounded-lg px-4 py-2 h-[3rem]"
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
