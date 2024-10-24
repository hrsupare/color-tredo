import React, { useState } from "react";
import CountdownTimer from "../CountDown/CountDownTimer";

const GameDashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [totalContractMoney, setTotalContractMoney] = useState(10); // Initialize with the default total

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

  // Function to update total contract money
  const updateTotalContractMoney = (amount) => {
    setTotalContractMoney((prevTotal) => prevTotal + amount);
  };

  return (
    <div className="p-3 bg-white shadow-md rounded-lg font-serif max-w-md mx-auto sm:max-w-lg lg:max-w-xl sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="mx-2">
          <p className="font-bold text-sm sm:text-lg">Periods</p>
          <p className="font-semibold text-xl sm:text-2xl">971447</p>
        </div>
        <div className="mx-2 text-center">
          <p className="font-bold text-sm sm:text-lg">Count Down</p>
          <CountdownTimer />
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-3 sm:mt-5">
        {/* Red Button */}
        <div className="flex-1">
          <button
            className="bg-gradient-to-r from-red-600 to-red-400 w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-red-400"
            onClick={() => handleButtonClick("Join Red")}
          >
            <span className="text-white font-semibold text-sm sm:text-md">Join Red</span>
          </button>
        </div>

        {/* Yellow Button */}
        <div className="flex-1">
          <button
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            onClick={() => handleButtonClick("Join Yellow")}
          >
            <span className="text-white font-semibold text-sm sm:text-md">Join Yellow</span>
          </button>
        </div>

        {/* Black Button */}
        <div className="flex-1">
          <button
            className="bg-black w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            onClick={() => handleButtonClick("Join Black")}
          >
            <span className="text-white font-semibold text-sm sm:text-md">Join Black</span>
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
          <div className="p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto sm:max-w-md sm:p-6">
            <h2 className="font-bold text-lg mb-3 text-center">{buttonColor}</h2>

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
                <button 
                  className="bg-gray-200 rounded-md py-1 w-10 text-sm" 
                  onClick={() => updateTotalContractMoney(-5)} // Subtract 5
                >
                  -5
                </button>
                <button 
                  className="bg-gray-200 rounded-md py-1 w-10 text-sm" 
                  onClick={() => updateTotalContractMoney(-1)} // Subtract 1
                >
                  -1
                </button>
              </div>

              {/* Displaying total contract money */}
              <div className="text-3xl font-bold">{totalContractMoney}</div>

              <div className="flex space-x-1">
                <button 
                  className="bg-gray-200 rounded-md py-1 w-10 text-sm" 
                  onClick={() => updateTotalContractMoney(1)} // Add 1
                >
                  +1
                </button>
                <button 
                  className="bg-gray-200 rounded-md py-1 w-10 text-sm" 
                  onClick={() => updateTotalContractMoney(5)} // Add 5
                >
                  +5
                </button>
              </div>
            </div>

            <p className="text-sm">Total Contract money is {totalContractMoney}</p>

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
    </div>
  );
};

export default GameDashboard;
