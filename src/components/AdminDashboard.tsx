"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Home, Activity } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockUsers = [
  { id: 'USR001', name: 'Max Robinson', email: 'max@example.com', role: 'Admin', status: 'Active' },
  { id: 'USR002', name: 'Jane Doe', email: 'jane@example.com', role: 'Buyer', status: 'Active' },
  { id: 'USR003', name: 'John Smith', email: 'john@example.com', role: 'Seller', status: 'Inactive' },
  { id: 'USR004', name: 'Emily White', email: 'emily@example.com', role: 'Renter', status: 'Active' },
  { id: 'USR005', name: 'James Brown', email: 'james@example.com', role: 'Investor', status: 'Active' },
];

const siteActivityData = [
    { name: 'Jan', users: 400, properties: 240 },
    { name: 'Feb', users: 300, properties: 139 },
    { name: 'Mar', users: 200, properties: 980 },
    { name: 'Apr', users: 278, properties: 390 },
    { name: 'May', users: 189, properties: 480 },
    { name: 'Jun', users: 239, properties: 380 },
    { name: 'Jul', users: 349, properties: 430 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Admin Dashboard</h1>
            <p className="text-xl text-muted-foreground">Welcome back, Admin!</p>
        </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties Listed</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Site Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={siteActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="hsl(var(--primary))" />
                    <Bar dataKey="properties" fill="hsl(var(--secondary))" />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
