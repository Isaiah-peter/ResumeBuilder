import React from "react";

export default function Input({ className = "", placeholder, ...props }) {
  return (
    <input
      className={`px-4 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-md focus:outline-none focus:ring-0] ${className}`}
      placeholder={placeholder}
      type="text"
      {...props}
    />
  );
}
