import React from "react";

const Header = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full">
            {/* Login Button on Left */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Login
            </button>

            {/* Centered Navigation Links */}
            <div className="space-x-6 text-lg font-medium">
                <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Contact Us</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Features</a>
            </div>

            {/* Gannon University Name and Logo on Right */}
            <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-gray-800">Gannon University</span>
                <img src="/logo.png" alt="GU Logo" className="h-10" />
            </div>
        </nav>
    );
};

export default Header;
