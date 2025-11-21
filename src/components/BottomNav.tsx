import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, History, User } from "lucide-react";
import { clsx } from "clsx";

const MENU = [
  { key: "home", label: "Início", icon: Home, path: "/dashboard" },
  { key: "new", label: "Nova", icon: PlusCircle, path: "/new", isMain: true },
  { key: "history", label: "Histórico", icon: History, path: "/history" },
  { key: "profile", label: "Perfil", icon: User, path: "/profile" }
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 pb-safe pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 md:max-w-md md:mx-auto md:relative md:border-t-0 md:shadow-none md:bg-transparent">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {MENU.map((m) => {
          const isActive = location.pathname === m.path;
          const Icon = m.icon;
          
          if (m.isMain) {
            return (
              <Link
                key={m.key}
                to={m.path}
                className="flex flex-col items-center justify-center -mt-8"
              >
                <div className="bg-primary-500 rounded-full p-3 shadow-lg shadow-primary-500/30 hover:scale-105 transition-transform">
                  <Icon size={32} color="white" />
                </div>
                <span className="text-xs font-medium text-neutral-500 mt-1">{m.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={m.key}
              to={m.path}
              className="flex flex-col items-center justify-center py-2 min-w-[60px]"
            >
              <Icon 
                size={24} 
                className={clsx("transition-colors", isActive ? "text-primary-500" : "text-neutral-400")} 
              />
              <span className={clsx("text-[10px] mt-1 font-medium", isActive ? "text-primary-500" : "text-neutral-400")}>
                {m.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
