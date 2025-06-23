// import React from "react";

// const Header = () => {
//     return (
//         <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full">
//             {/* Login Button on Left */}
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                 Login
//             </button>

//             {/* Centered Navigation Links */}
//             <div className="space-x-6 text-lg font-medium">
//                 <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
//                 <a href="#" className="text-gray-700 hover:text-blue-600">Contact Us</a>
//                 <a href="#" className="text-gray-700 hover:text-blue-600">Features</a>
//             </div>

//             {/* Gannon University Name and Logo on Right */}
//             <div className="flex items-center space-x-2">
//                 <span className="font-bold text-lg text-gray-800">Gannon University</span>
//                 <img src="/logo.png" alt="GU Logo" className="h-10" />
//             </div>
//         </nav>
//     );
// };

// export default Header;

"use client";

import React from "react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Header() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="w-full h-16 bg-maroon flex items-center justify-between px-4">
      <img src="/main_logo.svg" alt="Logo" className="h-12" />
      <div className="flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <a href="/dashboard" className="w-full">
                  Dashboard
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/settings" className="w-full">
                  Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/api/auth/logout" className="w-full text-red-600">
                  Log out
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="secondary" asChild>
            <a href="/api/auth/login">Sign In</a>
          </Button>
        )}
      </div>
    </div>
  );
}



