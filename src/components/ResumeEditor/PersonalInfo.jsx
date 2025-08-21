import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const PersonalInfo = () => {
    return (
        <div className="bg-[var(--white)] relative">
            <Navbar />
            <div className=" flex items-start">
                <Sidebar />
                <div className="flex items-start ml-3 mt-3">
                    <h1 className="text-black text-3xl font-bold">Personal Info</h1>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo