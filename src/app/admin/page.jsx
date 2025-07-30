"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/Header"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Manage Raffles</CardTitle>
              <CardDescription>
                Create, edit, and draw winners for all raffles.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/admin/raffles" passHref>
                <Button>Go to Raffle Management</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manage User Roles</CardTitle>
              <CardDescription>
                Promote users to new roles like Tutor or Admin.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/admin/users" passHref>
                <Button>Go to User Management</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
