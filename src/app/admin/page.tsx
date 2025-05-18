"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Trash2, Mail, Check, X } from "lucide-react"

export default function AdminDashboard() {
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  // 🚀 Load users from Supabase on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/get-approved-users")
        const result = await res.json()
        if (res.ok) {
          const formatted = result.users.map((u, i) => ({
            id: i + 1,
            email: u.email,
            status: u.is_approved ? "active" : "pending",
            dateAdded: u.date_assigned || "Unknown",
          }))
          setUsers(formatted)
        } else {
          console.error("Failed to load users:", result.error)
        }
      } catch (err) {
        console.error("Fetch error:", err)
      }
    }

    fetchUsers()
  }, [])

  const handleAddUser = async () => {
    if (!email || !email.includes("@")) return

    try {
      const res = await fetch("/api/promote-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()
      if (!res.ok) {
        console.error("Error promoting user:", result.error)
        return
      }

      const newUser = {
        id: users.length + 1,
        email: email,
        status: "active",
        dateAdded: new Date().toISOString().split("T")[0],
      }

      setUsers([...users, newUser])
      setEmail("")
    } catch (err) {
      console.error("Request failed:", err)
    }
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">STEM Center Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage user access to the notes platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Grant access to a new user by adding their email address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleAddUser} className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
            <CardDescription>View and manage user access to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "pending"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {user.status === "active" && <Check className="h-3 w-3 mr-1" />}
                            {user.status === "pending" && <Mail className="h-3 w-3 mr-1" />}
                            {user.status === "inactive" && <X className="h-3 w-3 mr-1" />}
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.dateAdded}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
