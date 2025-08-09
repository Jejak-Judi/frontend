"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (credentials.username === "admin" && credentials.password === "jejakjudi2025") {
      // Store auth token (in real app, use proper auth)
      localStorage.setItem("admin_token", "authenticated")
      router.push("/admin/dashboard")
    } else {
      setError("Username atau password salah")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">JejakJudi Admin</h1>
          <p className="text-slate-300">Sistem Detektif Digital Anti-Judi Online</p>
        </div>

        <Card className="border-slate-600 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Login Administrator</CardTitle>
            <CardDescription className="text-slate-300">Akses dashboard analisis dan manajemen sistem</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-600 bg-red-900/20">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Login ke Dashboard
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <p className="text-xs text-slate-300 mb-2">Demo Credentials:</p>
              <p className="text-xs text-slate-400">
                Username: <span className="text-white">admin</span>
              </p>
              <p className="text-xs text-slate-400">
                Password: <span className="text-white">jejakjudi2025</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-slate-400 text-sm">
          <p>© 2025 JejakJudi - GEMASTIK XVIII</p>
          <p>Universitas Andalas</p>
        </div>
      </div>
    </div>
  )
}
