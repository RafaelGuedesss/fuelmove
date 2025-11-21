import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        <main className="flex-1 flex flex-col pb-24 md:pb-0">
          <Outlet />
        </main>
        {!isAuthPage && <BottomNav />}
      </div>
    </div>
  );
}
