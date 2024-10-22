import React from "react";
import CountdownTimer from "../CountDown/CountDownTimer";

const GameDashboard = () => {
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
          <button className="bg-gradient-to-r from-red-600 to-red-400 w-full h-[3rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-red-400">
            <span className="text-white font-semibold text-md">Join Red</span>
          </button>
        </div>

        {/* Blue Button */}
        <div className="flex-1">
          <button className="bg-gradient-to-r from-yellow-600 to-yellow-400 w-full h-[3rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-400">
            <span className="text-white font-semibold text-md">Join Yellow</span>
          </button>
        </div>

        {/* Green Button */}
        <div className="flex-1">
          <button className="bg-black w-full h-[3rem] rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-green-400">
            <span className="text-white font-semibold text-md">Join Black</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;