import React from "react";

const AuthHeader = ({reglog}) => {  
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <a className="text-md decoration-none font-semibold">Register</a>
                <a className="text-md decoration-none font-semibold">Login</a>
            </div>
            <div className="flex h-[6px] bg-[var(--gray-lighter)]">
                <div className={`flex-1 h-full ${reglog == "register" && "bg-[var(--red-primary)]"}`}></div>
                <div className={`flex-1 h-full ${reglog == "login" && "bg-[var(--red-primary)]"}`}></div>
            </div>
        </div>
    )
}

export default AuthHeader;