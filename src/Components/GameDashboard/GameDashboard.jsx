import React, { useState, useEffect } from "react";
import CountdownTimer from "../CountDown/CountDownTimer";
import { Badge } from "@material-tailwind/react";

const GameDashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [totalContractMoney, setTotalContractMoney] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [contractMoney, setContractMoney] = useState(10);
  const [midNumber, setMidNumber] = useState(1);
  const [countdownSeconds, setCountdownSeconds] = useState(0);

  const handleButtonClick = (color) => {
    if (countdownSeconds > 10) {
      setButtonColor(color);
      setPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedNumber(null); // Close selected number popup as well
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-overlay") {
      handleClosePopup();
    }
  };

  const handleBadgeClick = (number) => {
    if (countdownSeconds > 10) {
      setSelectedNumber(number);
      setPopupVisible(true);
      setTotalContractMoney(1); // Reset to 1 when a new number is selected
    }
  };

  const updateTotalContractMoney = (amount) => {
    const newMidNumber = midNumber + amount;
    setMidNumber(newMidNumber >= 1 ? newMidNumber : midNumber); // Ensure midNumber never goes below 1
    setTotalContractMoney(contractMoney * (newMidNumber >= 1 ? newMidNumber : midNumber)); // Update total
  };

  useEffect(() => {
    const savedStartTime = localStorage.getItem('startTime');
    if (savedStartTime) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
      const remainingSeconds = Math.max(0, 120 - (elapsedSeconds % 125));
      setCountdownSeconds(remainingSeconds);
    } else {
      setCountdownSeconds(120);
      localStorage.setItem('startTime', Date.now().toString());
    }

    const intervalId = setInterval(() => {
      setCountdownSeconds(prevSeconds => {
        const newSeconds = prevSeconds - 1;
        if (newSeconds <= 0) {
          setTimeout(() => {
            setCountdownSeconds(120);
            localStorage.setItem('startTime', Date.now().toString());
          }, 5000);
        }
        return newSeconds >= 0 ? newSeconds : 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Calculate minutes and seconds from countdownSeconds
  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;

  const badgeBackgroundStyles = (number) => {
    // Change badge color to gray when countdownSeconds is 10 or less
    if (countdownSeconds <= 10) {
      return `bg-gray-300 cursor-not-allowed`; // Gray color for disabled state
    }

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


  // Check if buttons should be disabled
  const isDisabled = countdownSeconds <= 10;

  return (
    <div className="p-3 bg-white shadow-md rounded-lg font-serif max-w-md mx-auto sm:max-w-lg lg:max-w-xl sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="mx-2">
          <p className="font-bold text-sm sm:text-lg">Periods</p>
          <p className="font-semibold text-xl sm:text-2xl">971447</p>
        </div>
        <div className="mx-2 text-center">
          <p className="font-bold text-sm sm:text-lg">Count Down</p>
          <div className="flex space-x-1">
            {minutes.toString().padStart(2, '0').split('').map((digit, index) => (
              <div key={`minute-${index}`} className="bg-gray-200 rounded-md p-1 w-8 text-center">
                <p className="text-lg font-semibold">{digit}</p>
              </div>
            ))}
            <div >
              <p className="text-xl font-semibold">:</p>
            </div>
            {seconds.toString().padStart(2, '0').split('').map((digit, index) => (
              <div key={`second-${index}`} className="bg-gray-200 rounded-md p-1 w-8 text-center">
                <p className="text-lg font-semibold">{digit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-3 sm:mt-5">
        <div className="flex-1">
          <button
            className={`w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-red-600 to-red-400"}`}
            onClick={() => handleButtonClick("Join Red")}
            disabled={isDisabled}
          >
            <span className="text-white font-semibold text-sm sm:text-md">Join Red</span>
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-yellow-600 to-yellow-400"}`}
            onClick={() => handleButtonClick("Join Yellow")}
            disabled={isDisabled}
          >
            <span className="text-white font-semibold text-sm sm:text-md">Join Yellow</span>
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-black"}`}
            onClick={() => handleButtonClick("Join Black")}
            disabled={isDisabled}
          >
            <span className="text-white font-semibold text-sm sm:text-md">Join Black</span>
          </button>
        </div>
      </div>

      {/* Number Selection Section */}
      <div className="mt-6 font-extrabold text-lg sm:text-xl w-full text-center p-1 text-gray-1000">
        Select the Number
      </div>

      <div className="flex justify-between p-2 sm:p-5 gap-3 mx-4 sm:mx-6">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleBadgeClick(index)}
            className={`focus:outline-none transform hover:scale-105 transition-transform duration-200 
        ${isDisabled ? "cursor-not-allowed" : ""}`} // Add cursor-not-allowed when disabled
            disabled={isDisabled}
          >
            <Badge
              className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm font-bold ${badgeBackgroundStyles(index)}`}
              content={index}
            />
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-4 sm:mt-6 gap-3 p-2 sm:p-5 mx-4 sm:mx-6">
        {[5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleBadgeClick(number)}
            className={`focus:outline-none transform hover:scale-105 transition-transform duration-200 
              ${isDisabled ? "cursor-not-allowed" : ""}`}
            disabled={isDisabled}
          >
            <Badge
              className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm font-bold ${badgeBackgroundStyles(number)}`}
              content={number}
            />
          </button>
        ))}
      </div>

      {isPopupVisible && (
        <div
          id="popup-overlay"
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="p-4 bg-white shadow-md rounded-lg w-[90%] max-w-xl mx-auto sm:p-6">
            <h2 className="font-bold text-lg mb-3 text-center">
              {selectedNumber !== null ? `Join ${selectedNumber}` : buttonColor}
            </h2>

            <p className="text-sm">Contract Money</p>
            <div className="flex space-x-1 mb-3">
              {[10, 100, 1000].map((value) => (
                <button
                  key={value}
                  className={`flex-1 py-1 text-sm rounded-md ${contractMoney === value ? "bg-pink-400" : "bg-gray-200"
                    }`}
                  onClick={() => setContractMoney(value)}
                >
                  {value}
                </button>
              ))}
            </div>

            <p className="text-sm">Numbers</p>
            <div className="flex justify-between mb-2">
              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm" onClick={() => updateTotalContractMoney(-5)}>
                  -5
                </button>
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm" onClick={() => updateTotalContractMoney(-1)}>
                  -1
                </button>
              </div>

              <div className="text-3xl font-bold">{midNumber}</div>

              <div className="flex space-x-1">
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm" onClick={() => updateTotalContractMoney(1)}>
                  +1
                </button>
                <button className="bg-gray-200 rounded-md py-1 w-10 text-sm" onClick={() => updateTotalContractMoney(5)}>
                  +5
                </button>
              </div>
            </div>

            <p className="text-sm">Total Contract money is {totalContractMoney}</p>

            <div className="flex justify-end mt-3">
              <button className="bg-green-500 text-white text-sm rounded-md px-4 py-2 h-[2.5rem]" onClick={handleClosePopup}>
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