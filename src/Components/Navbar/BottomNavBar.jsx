import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gradient-to-r from-indigo-500 to-indigo-100 hover:from-indigo-600 hover:to-indigo-200 text-white shadow-md border-t border-gray-200 rounded-t-lg z-50">
      <div className="flex justify-around p-2">
        <button
          onClick={() => handleNavigation('/home')}
          className="flex flex-col items-center space-y-1 hover:text-blue-600 transition-colors duration-200"
          aria-label="Go to Home"
        >
          <span className="material-icons text-2xl sm:text-3xl text-black">home</span>
          <span className="text-xs sm:text-s font-serif font-bold text-black">Home</span>
        </button>
        <button
          onClick={() => handleNavigation('/referral')}
          className="flex flex-col items-center space-y-1 hover:text-blue-600 transition-colors duration-200"
          aria-label="Go to Referral"
        >
          <span className="material-icons text-2xl sm:text-3xl text-black">group</span>
          <span className="text-xs sm:text-s font-serif font-bold text-black">Referral</span>
        </button>
        <button
          onClick={() => handleNavigation('/orders')}
          className="flex flex-col items-center space-y-1 hover:text-blue-600 transition-colors duration-200"
          aria-label="Go to Orders"
        >
          <span className="material-icons text-2xl sm:text-3xl text-black">shopping_cart</span>
          <span className="text-xs sm:text-s font-serif font-bold text-black">Orders</span>
        </button>
        <button
          onClick={() => handleNavigation('/profile')}
          className="flex flex-col items-center space-y-1 hover:text-blue-600 transition-colors duration-200"
          aria-label="Go to Profile"
        >
          <span className="material-icons text-2xl sm:text-3xl text-black">person</span>
          <span className="text-xs sm:text-s font-serif font-bold text-black">Profile</span>
        </button>
        <button
          onClick={() => handleNavigation('/balance')}
          className="flex flex-col items-center space-y-1 hover:text-blue-600 transition-colors duration-200"
          aria-label="Go to Balance"
        >
          <span className="material-icons text-2xl sm:text-3xl text-black">account_balance_wallet</span>
          <span className="text-xs sm:text-s font-serif font-bold text-black">Balance</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavBar;
