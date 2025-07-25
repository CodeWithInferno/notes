"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { user, error, isLoading } = useUser()

  return (
    <header className="bg-background/70 backdrop-blur-lg sticky top-0 z-40 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          GU<span className="text-primary">Notes</span>
        </Link>
        <nav className="flex items-center gap-4">
          {isLoading && (
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          )}
          {!isLoading && !error && user && (
            <>
              <Link href="/dashboard" passHref>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.picture} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/explore" passHref><DropdownMenuItem>Explore</DropdownMenuItem></Link>
                  <Link href="/admin" passHref><DropdownMenuItem>Admin</DropdownMenuItem></Link>
                  <DropdownMenuSeparator />
                  <Link href="/api/auth/logout" passHref><DropdownMenuItem>Logout</DropdownMenuItem></Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          {!isLoading && !error && !user && (
            <Link href="/api/auth/login" passHref>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}