import React from "react";
import { NavbarDefault } from "../Components/Navbar/NavbarDefault";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div className="flex justify-center ">
      <div className="min-h-screen max-w-screen-sm flex-col ">

        <main className="flex-grow    ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
