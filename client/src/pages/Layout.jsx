import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const Layout = () => {
  let user = useSelector((state) => state.user.value);
  console.log(user);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return user ? (
    <div className="w-full flex h-screen">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 bg-slate-50">
        <Outlet />
      </div>
      {sidebarOpen ? (
        <X
          onClick={() => setSidebarOpen(false)}
          className="absolute top-3 right-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
        />
      ) : (
        <Menu
          onClick={() => setSidebarOpen(true)}
          className="absolute top-3 right-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
