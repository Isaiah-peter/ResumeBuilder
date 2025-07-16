import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`px-4 py-2 border border-[var(--gray-medium)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--blue-primary)] ${className}`}
      {...props}
    />
  );
}

export function TextArea({ className = "", ...props }) {
  return (
    <textarea
      className={`px-4 py-2 border border-[var(--gray-medium)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--blue-primary)] ${className}`}
      rows={4}
      {...props}
    />
  );
}