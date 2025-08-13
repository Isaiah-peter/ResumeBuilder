import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const PersonalInfo = () => {
    return (
        <div className="bg-[var(--white)] relative">
            <Navbar />
            <div>
                <Sidebar />
            </div>
        </div>
    )
}

export default PersonalInfo