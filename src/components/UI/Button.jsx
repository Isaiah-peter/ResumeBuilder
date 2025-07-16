import React from 'react'

export default function Button({ children, className ="", ...props }) {
    return (
        <a
        className={`px-4 cursor-pointer py-2 bg-[var(--red-primary)] rounded text-[var(--white)] ${className}`}
        {...props}
        >
            {children}
        </a>
    )
}