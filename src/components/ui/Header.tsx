import React from "react";
import { Menu, Bell, User } from "lucide-react";

export default function Header({ title = "FuelMove" }: { title?: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-100 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="p-1 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold text-neutral-800">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-1 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
          <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
        </button>
      </div>
    </header>
  );
}
