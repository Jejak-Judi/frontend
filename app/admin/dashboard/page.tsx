"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Users,
  FileText,
  Eye,
  Clock,
  CheckCircle,
  Network,
  Shield,
  Activity,
  Database,
  Zap,
  Lock,
} from "lucide-react"

export default function AdminDashboard() {
  const systemMetrics = [
    { label: "Laporan Hari Ini", value: "147", change: "+23%", icon: FileText, color: "blue" },
    { label: "Watermark Terdeteksi", value: "89", change: "+15%", icon: AlertTriangle, color: "red" },
    { label: "Akun Teranalisis", value: "234", change: "+8%", icon: Users, color: "green" },
    { label: "Bukti Forensik", value: "67", change: "+12%", icon: Shield, color: "purple" },
  ]

  const aiPerformance = [
    { model: "ResNet-50 Watermark", accuracy: 94.2, precision: 92.8, recall: 95.1, f1: 93.9 },
    { model: "Tesseract OCR", accuracy: 87.5, precision: 89.2, recall: 85.8, f1: 87.5 },
    { model: "Graph Clustering", accuracy: 91.3, precision: 88.7, recall: 94.2, f1: 91.4 },
  ]

  const recentDetections = [
    {
      id: "JJ-2025-001234",
      platform: "Instagram",
      confidence: 94.2,
      watermarks: 3,
      ocrText: "SLOT88 BONUS NEW MEMBER",
      timestamp: "2025-01-09 14:30",
      status: "verified",
    },
    {
      id: "JJ-2025-001233",
      platform: "TikTok",
      confidence: 87.5,
      watermarks: 2,
      ocrText: "GACOR MAXWIN WA: 0812345678",
      timestamp: "2025-01-09 14:25",
      status: "processing",
    },
    {
      id: "JJ-2025-001232",
      platform: "YouTube",
      confidence: 91.8,
      watermarks: 1,
      ocrText: "TOGEL HONGKONG PREDIKSI",
      timestamp: "2025-01-09 14:20",
      status: "verified",
    },
  ]

  const networkStats = [
    { label: "Total Nodes", value: "1,247", description: "Akun + Konten" },
    { label: "Communities", value: "23", description: "Cluster Terdeteksi" },
    { label: "Key Actors", value: "15", description: "High Centrality" },
    { label: "Connections", value: "3,891", description: "Edge Relationships" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600">Sistem Detektif Digital JejakJudi - Real-time Monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <metric.icon className={`h-4 w-4 text-${metric.color}-600`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs text-${metric.color}-600`}>{metric.change} dari kemarin</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detection">AI Detection</TabsTrigger>
          <TabsTrigger value="network">Network Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Detections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  Deteksi Terbaru
                </CardTitle>
                <CardDescription>Watermark dan konten yang baru terdeteksi oleh AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDetections.map((detection) => (
                    <div key={detection.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {detection.status === "verified" ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          ) : (
                            <Clock className="h-8 w-8 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{detection.id}</p>
                          <p className="text-sm text-gray-500">
                            {detection.platform} • {detection.timestamp}
                          </p>
                          <p className="text-xs text-red-600 font-mono">"{detection.ocrText}"</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="mb-1">
                          {detection.confidence}% Confidence
                        </Badge>
                        <p className="text-xs text-gray-500">{detection.watermarks} watermark(s)</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Network Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 mr-2 text-purple-600" />
                  Analisis Jaringan
                </CardTitle>
                <CardDescription>Statistik graf dan komunitas yang terdeteksi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {networkStats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                      <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Model Performance */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performa Model AI</CardTitle>
                <CardDescription>Metrik akurasi untuk setiap model dalam pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {aiPerformance.map((model) => (
                    <div key={model.model} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{model.model}</h4>
                        <Badge variant="outline">{model.accuracy}% Accuracy</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Precision</p>
                          <Progress value={model.precision} className="mt-1" />
                          <p className="text-xs text-gray-500 mt-1">{model.precision}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Recall</p>
                          <Progress value={model.recall} className="mt-1" />
                          <p className="text-xs text-gray-500 mt-1">{model.recall}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">F1-Score</p>
                          <Progress value={model.f1} className="mt-1" />
                          <p className="text-xs text-gray-500 mt-1">{model.f1}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detection Pipeline Status */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Status</CardTitle>
                <CardDescription>Status real-time dari setiap komponen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content Fetcher</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Frame Extractor</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ResNet-50 Detector</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-yellow-600">Busy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tesseract OCR</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Graph Analytics</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Evidence Vault</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Detection Results</CardTitle>
                <CardDescription>Hasil algoritma Louvain/Leiden untuk deteksi komunitas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">Komunitas Slot Online</p>
                      <p className="text-sm text-red-600">15 akun • Centrality: 0.42</p>
                    </div>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-orange-800">Jaringan Togel</p>
                      <p className="text-sm text-orange-600">12 akun • Centrality: 0.35</p>
                    </div>
                    <Badge variant="secondary">Medium Risk</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">Grup Casino</p>
                      <p className="text-sm text-yellow-600">8 akun • Centrality: 0.28</p>
                    </div>
                    <Badge variant="outline">Low Risk</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Actors Analysis</CardTitle>
                <CardDescription>Akun dengan betweenness centrality tertinggi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-red-600">S</span>
                      </div>
                      <div>
                        <p className="font-medium">@slot88_gacor</p>
                        <p className="text-sm text-gray-500">Instagram • 45K followers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">0.42</p>
                      <p className="text-xs text-gray-500">Centrality</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-600">G</span>
                      </div>
                      <div>
                        <p className="font-medium">@gacor_maxwin</p>
                        <p className="text-sm text-gray-500">TikTok • 32K followers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">0.38</p>
                      <p className="text-xs text-gray-500">Centrality</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  System Load
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>GPU Usage</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-600" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Evidence Vault</span>
                      <span>2.3 TB</span>
                    </div>
                    <Progress value={76} />
                    <p className="text-xs text-gray-500 mt-1">76% of 3TB used</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Blockchain</span>
                      <span>45 GB</span>
                    </div>
                    <Progress value={23} />
                    <p className="text-xs text-gray-500 mt-1">23% of 200GB used</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Processing Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">1.8s</div>
                    <p className="text-sm text-gray-600">Avg Detection Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">147</div>
                    <p className="text-sm text-gray-600">Reports/Hour</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">99.2%</div>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cloud Services Status</CardTitle>
                <CardDescription>Status layanan Google Cloud Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { service: "Cloud Run", status: "healthy", region: "asia-southeast2" },
                    { service: "Vertex AI", status: "healthy", region: "asia-southeast1" },
                    { service: "Cloud Storage", status: "healthy", region: "asia-southeast2" },
                    { service: "Cloud SQL", status: "healthy", region: "asia-southeast2" },
                    { service: "Pub/Sub", status: "healthy", region: "asia-southeast2" },
                    { service: "Cloud KMS", status: "healthy", region: "global" },
                  ].map((item) => (
                    <div key={item.service} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{item.service}</p>
                        <p className="text-xs text-gray-500">{item.region}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 capitalize">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>Status keamanan dan compliance sistem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">ISO/IEC 27043</p>
                        <p className="text-sm text-green-600">Forensic Standards</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Chain of Custody</p>
                        <p className="text-sm text-green-600">Blockchain Verified</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Data Encryption</p>
                        <p className="text-sm text-green-600">KMS Protected</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
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
