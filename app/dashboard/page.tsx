"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Users, FileText, Eye, Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const recentReports = [
    {
      id: "JJ-2025-001234",
      platform: "Instagram",
      status: "processing",
      watermarkDetected: true,
      confidence: 94.2,
      submittedAt: "2025-01-09 14:30",
      type: "image",
    },
    {
      id: "JJ-2025-001233",
      platform: "TikTok",
      status: "completed",
      watermarkDetected: true,
      confidence: 87.5,
      submittedAt: "2025-01-09 13:15",
      type: "video",
    },
    {
      id: "JJ-2025-001232",
      platform: "YouTube",
      status: "completed",
      watermarkDetected: false,
      confidence: 12.3,
      submittedAt: "2025-01-09 12:45",
      type: "video",
    },
  ]

  const detectionResults = [
    {
      id: "frame_000123.jpg",
      score: 0.93,
      boxes: 1,
      ocrText: "SLOT88 BONUS NEW MEMBER\nwww.xx-judol.xyz",
      platform: "Instagram",
    },
    {
      id: "frame_000456.jpg",
      score: 0.87,
      boxes: 2,
      ocrText: "GACOR MAXWIN\nWA: 0812345678",
      platform: "TikTok",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Investigasi</h1>
          <p className="text-gray-600">
            Pantau status laporan, hasil deteksi AI, dan analisis jaringan distribusi konten
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laporan Hari Ini</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+8 dari kemarin</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watermark Terdeteksi</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Akurasi 94.2%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sedang Diproses</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Rata-rata 2.3 menit</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Akun Teridentifikasi</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">15 akun kunci</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">Laporan Terbaru</TabsTrigger>
            <TabsTrigger value="detection">Hasil Deteksi</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Terbaru</CardTitle>
                <CardDescription>Status pemrosesan laporan konten yang masuk hari ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {report.status === "completed" ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          ) : report.status === "processing" ? (
                            <Clock className="h-8 w-8 text-yellow-600" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{report.id}</p>
                          <p className="text-sm text-gray-500">
                            {report.platform} • {report.type} • {report.submittedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {report.watermarkDetected && (
                          <Badge variant="destructive">Watermark Terdeteksi ({report.confidence}%)</Badge>
                        )}
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                          {report.status === "completed"
                            ? "Selesai"
                            : report.status === "processing"
                              ? "Diproses"
                              : "Error"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Detail
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hasil Deteksi Watermark</CardTitle>
                <CardDescription>Watermark yang berhasil dideteksi oleh model ResNet-50 + OCR</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {detectionResults.map((result) => (
                    <Card key={result.id} className="border-2">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{result.id}</CardTitle>
                            <Badge variant="outline">{result.platform}</Badge>
                          </div>
                          <Badge variant="destructive">Skor: {(result.score * 100).toFixed(1)}%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Preview Gambar</p>
                            <p className="text-xs text-gray-500">{result.boxes} kotak deteksi</p>
                          </div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-red-800 mb-1">Teks Terdeteksi (OCR):</p>
                          <p className="text-sm text-red-700 whitespace-pre-line">{result.ocrText}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Lihat Detail
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Export Bukti
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tren Deteksi Mingguan</CardTitle>
                  <CardDescription>Jumlah watermark terdeteksi dalam 7 hari terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Senin</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={75} className="w-24" />
                        <span className="text-sm font-medium">45</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Selasa</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={60} className="w-24" />
                        <span className="text-sm font-medium">36</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rabu</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={90} className="w-24" />
                        <span className="text-sm font-medium">54</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kamis</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={45} className="w-24" />
                        <span className="text-sm font-medium">27</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Jumat</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={80} className="w-24" />
                        <span className="text-sm font-medium">48</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribusi</CardTitle>
                  <CardDescription>Sebaran konten berdasarkan platform media sosial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                        <span className="text-sm">Instagram</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-24" />
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <span className="text-sm">TikTok</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={25} className="w-24" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">YouTube</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={10} className="w-24" />
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performa Model AI</CardTitle>
                <CardDescription>Metrik akurasi deteksi watermark ResNet-50</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">94.2%</div>
                    <p className="text-sm text-gray-600">Precision</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">91.8%</div>
                    <p className="text-sm text-gray-600">Recall</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">93.0%</div>
                    <p className="text-sm text-gray-600">F1-Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
