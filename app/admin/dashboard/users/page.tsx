"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Data dummy untuk users
const usersData = [
  {
    id: "user_001",
    name: "Dr. Ahmad Fauzi",
    email: "ahmad.fauzi@polri.go.id",
    role: "investigator",
    department: "Polda Metro Jaya",
    status: "active",
    lastLogin: "2025-01-09 15:30",
    reportsSubmitted: 23,
    casesHandled: 12,
    joinedAt: "2024-08-15",
    permissions: ["view_evidence", "generate_reports", "manage_cases"],
  },
  {
    id: "user_002",
    name: "Sarah Wijaya",
    email: "sarah.wijaya@kominfo.go.id",
    role: "analyst",
    department: "Kominfo",
    status: "active",
    lastLogin: "2025-01-09 14:45",
    reportsSubmitted: 45,
    casesHandled: 28,
    joinedAt: "2024-06-20",
    permissions: ["view_evidence", "network_analysis", "ai_detection"],
  },
  {
    id: "user_003",
    name: "Budi Santoso",
    email: "budi.santoso@ppatk.go.id",
    role: "forensic_expert",
    department: "PPATK",
    status: "active",
    lastLogin: "2025-01-09 13:20",
    reportsSubmitted: 67,
    casesHandled: 34,
    joinedAt: "2024-03-10",
    permissions: ["view_evidence", "generate_reports", "blockchain_access", "court_reports"],
  },
  {
    id: "user_004",
    name: "Lisa Chen",
    email: "lisa.chen@univ.ac.id",
    role: "researcher",
    department: "Universitas Indonesia",
    status: "pending",
    lastLogin: "Never",
    reportsSubmitted: 0,
    casesHandled: 0,
    joinedAt: "2025-01-08",
    permissions: ["view_statistics"],
  },
  {
    id: "user_005",
    name: "Eko Prasetyo",
    email: "eko.prasetyo@kejaksaan.go.id",
    role: "prosecutor",
    department: "Kejaksaan Agung",
    status: "inactive",
    lastLogin: "2024-12-15 10:30",
    reportsSubmitted: 15,
    casesHandled: 8,
    joinedAt: "2024-05-22",
    permissions: ["view_evidence", "court_reports"],
  },
]

const roleDefinitions = [
  {
    id: "admin",
    name: "System Administrator",
    description: "Full system access with user management capabilities",
    permissions: ["all_permissions"],
    color: "red",
    count: 2,
  },
  {
    id: "investigator",
    name: "Law Enforcement Investigator",
    description: "Police officers and investigators with case management access",
    permissions: ["view_evidence", "generate_reports", "manage_cases"],
    color: "blue",
    count: 8,
  },
  {
    id: "analyst",
    name: "Digital Analyst",
    description: "Technical analysts with AI detection and network analysis access",
    permissions: ["view_evidence", "network_analysis", "ai_detection"],
    color: "green",
    count: 12,
  },
  {
    id: "forensic_expert",
    name: "Forensic Expert",
    description: "Digital forensic specialists with blockchain and court report access",
    permissions: ["view_evidence", "generate_reports", "blockchain_access", "court_reports"],
    color: "purple",
    count: 5,
  },
  {
    id: "prosecutor",
    name: "Prosecutor",
    description: "Legal prosecutors with evidence viewing and court report access",
    permissions: ["view_evidence", "court_reports"],
    color: "orange",
    count: 6,
  },
  {
    id: "researcher",
    name: "Academic Researcher",
    description: "Researchers with limited access to statistics and anonymized data",
    permissions: ["view_statistics"],
    color: "gray",
    count: 3,
  },
]

const systemStats = {
  totalUsers: 36,
  activeUsers: 28,
  pendingUsers: 4,
  inactiveUsers: 4,
  totalLogins: 1247,
  avgSessionTime: "2h 34m",
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-600">Kelola akses pengguna dan permissions untuk sistem JejakJudi</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Name, email, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roleDefinitions.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Role</p>
                        <Badge
                          variant="outline"
                          className={`${
                            user.role === "admin"
                              ? "border-red-300 text-red-700"
                              : user.role === "investigator"
                                ? "border-blue-300 text-blue-700"
                                : user.role === "analyst"
                                  ? "border-green-300 text-green-700"
                                  : user.role === "forensic_expert"
                                    ? "border-purple-300 text-purple-700"
                                    : user.role === "prosecutor"
                                      ? "border-orange-300 text-orange-700"
                                      : "border-gray-300 text-gray-700"
                          }`}
                        >
                          {roleDefinitions.find((r) => r.id === user.role)?.name || user.role}
                        </Badge>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Status</p>
                        <div className="flex items-center space-x-1">
                          {user.status === "active" && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {user.status === "pending" && <Clock className="h-4 w-4 text-yellow-600" />}
                          {user.status === "inactive" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                          <span
                            className={`text-sm font-medium ${
                              user.status === "active"
                                ? "text-green-600"
                                : user.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Activity</p>
                        <p className="text-sm font-medium">{user.reportsSubmitted} reports</p>
                        <p className="text-xs text-gray-500">{user.casesHandled} cases</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Last Login</p>
                        <p className="text-sm font-medium">
                          {user.lastLogin === "Never" ? "Never" : user.lastLogin.split(" ")[0]}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.lastLogin !== "Never" && user.lastLogin.split(" ")[1]}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Permissions:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.permissions.slice(0, 3).map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission.replace("_", " ")}
                            </Badge>
                          ))}
                          {user.permissions.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{user.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Joined: {user.joinedAt}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleDefinitions.map((role) => (
              <Card key={role.id} className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 bg-${role.color}-500`}></div>
                        {role.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{role.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{role.count} users</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Permissions:</p>
                    <div className="space-y-1">
                      {role.permissions.map((permission) => (
                        <div key={permission} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                          {permission === "all_permissions" ? "All System Permissions" : permission.replace("_", " ")}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Role
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
              <CardDescription>Log aktivitas pengguna dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "Dr. Ahmad Fauzi",
                    action: "Generated forensic report",
                    target: "JJ-2025-001234",
                    timestamp: "2025-01-09 15:30",
                    type: "report",
                  },
                  {
                    user: "Sarah Wijaya",
                    action: "Analyzed network graph",
                    target: "Community COMM_1",
                    timestamp: "2025-01-09 14:45",
                    type: "analysis",
                  },
                  {
                    user: "Budi Santoso",
                    action: "Verified evidence integrity",
                    target: "Evidence vault",
                    timestamp: "2025-01-09 13:20",
                    type: "verification",
                  },
                  {
                    user: "Lisa Chen",
                    action: "Requested access",
                    target: "System registration",
                    timestamp: "2025-01-08 16:15",
                    type: "access",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "report"
                            ? "bg-blue-100"
                            : activity.type === "analysis"
                              ? "bg-green-100"
                              : activity.type === "verification"
                                ? "bg-purple-100"
                                : "bg-yellow-100"
                        }`}
                      >
                        {activity.type === "report" && <FileText className="h-5 w-5 text-blue-600" />}
                        {activity.type === "analysis" && <Users className="h-5 w-5 text-green-600" />}
                        {activity.type === "verification" && <Shield className="h-5 w-5 text-purple-600" />}
                        {activity.type === "access" && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{activity.timestamp.split(" ")[1]}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp.split(" ")[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((systemStats.activeUsers / systemStats.totalUsers) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.pendingUsers}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalLogins}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Role</CardTitle>
                <CardDescription>Distribusi pengguna berdasarkan peran</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roleDefinitions.map((role) => (
                    <div key={role.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 bg-${role.color}-500 rounded-full`}></div>
                        <span className="text-sm">{role.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 bg-${role.color}-500 rounded-full`}
                            style={{ width: `${(role.count / systemStats.totalUsers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{role.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity Metrics</CardTitle>
                <CardDescription>Metrik aktivitas pengguna</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Average Session Time</span>
                    <span className="font-bold">{systemStats.avgSessionTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Daily Active Users</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Reports Generated</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Cases Handled</span>
                    <span className="font-bold">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
