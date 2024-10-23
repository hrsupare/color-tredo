import React from 'react';
import BottomNavBar from '../Components/Navbar/BottomNavBar';

const Referral = () => {
    return (
        <div className="flex flex-col items-center justify-center  gap-2 p-2 bg-gra max-w-lg mx-auto w-full transition-all duration-500">
            {/* Agent Amount Section */}
            <div className="flex justify-center items-center p-2 w-full">
                <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Agent Amount</h2>
                    </div>
                    {/* Display Amount and Withdraw Button in Flexbox */}
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-4xl font-bold text-gray-800">₹0.00</p>
                        <button className="bg-gradient-to-r from-indigo-500 to-indigo-600  text-white text-base font-semibold px-6 py-2 rounded-lg shadow-lg">
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>

            {/* Invited Today and Today's Income Section */}
            <div className="flex justify-center items-center p-2 w-full">
                <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        {/* Invited Today */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-600">Invited Today</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                            <p className="text-xs text-gray-500 mt-1">Total: 0</p>
                        </div>
                        {/* Today's Income */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-600">Today's Income</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">₹0.00</p>
                            <p className="text-xs text-gray-500 mt-1">Total: ₹0</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Income Details */}
            <div className="flex justify-center items-center p-2 w-full">
                <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Income Details</h2>
                        <span className="text-sm text-indigo-500">more &gt;</span>
                    </div>
                    <div className="text-center text-gray-500">No records</div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <BottomNavBar />
        </div>
    );
};

export default Referral;
