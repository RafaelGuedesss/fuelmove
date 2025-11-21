import React from "react";
import { clsx } from "clsx";

interface LargeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
  loading?: boolean;
}

export default function LargeButton({ children, className, variant = "primary", loading, ...props }: LargeButtonProps) {
  return (
    <button
      className={clsx(
        "w-full px-5 py-4 rounded-xl font-semibold text-lg transition-all active:scale-[0.98] shadow-lg shadow-primary-500/20",
        variant === "primary" ? "bg-primary-500 hover:bg-primary-600 text-white" : "bg-red-500 hover:bg-red-600 text-white",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Processando..." : children}
    </button>
  );
}
