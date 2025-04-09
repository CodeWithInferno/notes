// "use client";

// import React from "react";
// import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useUser } from "@auth0/nextjs-auth0/client";

// export default function Header() {
//   const { user, error, isLoading } = useUser();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;

//   return (
//     <div className="w-full h-16 bg-maroon flex items-center justify-between px-4">
//       <img src="/main_logo.svg" alt="Logo" className="h-12" />
//       <div className="flex items-center space-x-4">
//         {user ? (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <img
//                 src={user.picture}
//                 alt={user.name}
//                 className="w-10 h-10 rounded-full cursor-pointer"
//               />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-48">
//               <DropdownMenuItem asChild>
//                 <a href="/dashboard" className="w-full">
//                   Dashboard
//                 </a>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <a href="/settings" className="w-full">
//                   Settings
//                 </a>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem asChild>
//                 <a href="/api/auth/logout" className="w-full text-red-600">
//                   Log out
//                 </a>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ) : (
//           <Button variant="secondary" asChild>
//             <a href="/api/auth/login">Sign In</a>
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }



export default function Header() {
  return (
    <header className="bg-[#8e0e00] text-white py-4 px-5 text-center">
      <h1 className="text-3xl font-bold">GUNotes</h1>
      {/* Removed the "Your one-stop shop for Gannon University notes" text */}
    </header>
  )
}
