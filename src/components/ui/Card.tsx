import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-card border border-neutral-100 mb-3 transition-all hover:shadow-md">
      {children}
    </div>
  );
}
