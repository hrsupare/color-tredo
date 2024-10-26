import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameDashboard from "../Components/GameDashboard/GameDashboard";
import OrderTabs from "../Components/Tabs/OrderTabs";
import BottomNavBar from '../Components/Navbar/BottomNavBar';
import { NavbarDefault } from '../Components/Navbar/NavbarDefault';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="mt-5 space-y-6 mb-16" >
      <header>
        <NavbarDefault />
      </header>
      <GameDashboard />
      {/* <NumberComponent /> */}
      <OrderTabs />
      <BottomNavBar />
    </div>
  );
};

export default Home;
