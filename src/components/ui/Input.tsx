import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-neutral-500 mb-1.5 ml-1">{label}</label>}
      <input
        className="w-full bg-neutral-50 border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 px-4 py-3 rounded-xl outline-none transition-all text-neutral-800 placeholder:text-neutral-400"
        {...props}
      />
    </div>
  );
}
