"use client";

import React from "react";
import { Button } from "../ui/button";
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
          <img
            src={user.picture}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Button variant="secondary" asChild>
            <a href="/api/auth/login">Sign In</a>
          </Button>
        )}
      </div>
    </div>
  );
}
