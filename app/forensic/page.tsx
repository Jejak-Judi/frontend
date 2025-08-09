"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Download,
  FileText,
  Lock,
  ArrowLeft,
  Search,
  Calendar,
  Hash,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function ForensicPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)

  const forensicCases = [
    {
      id: "JJ-2025-001234",
      title: "Jaringan Slot Online Instagram",
      status: "completed",
      createdAt: "2025-01-09 14:30",
      evidence: {
        images: 15,
        videos: 3,
        accounts: 8,
        watermarks: 12,
      },
      blockchain: {
        txHash: "0xabcdef123456789",
        blockNumber: 1234567,
        timestamp: "2025-01-09 14:35:22",
      },
      integrity: "verified",
    },
    {
      id: "JJ-2025-001233",
      title: "Kampanye Togel TikTok",
      status: "processing",
      createdAt: "2025-01-09 13:15",
      evidence: {
        images: 8,
        videos: 12,
        accounts: 5,
        watermarks: 6,
      },
      blockchain: {
        txHash: "0x987654321abcdef",
        blockNumber: 1234566,
        timestamp: "2025-01-09 13:20:11",
      },
      integrity: "verified",
    },
  ]

  const chainOfCustody = [
    {
      timestamp: "2025-01-09 14:30:15",
      action: "INGESTION_COMPLETED",
      actor: "cloudrun:content-fetcher@v1.3.0",
      artifact: "media.mp4",
      hash: "1f3a...9c",
      txHash: "0xabc...123",
    },
    {
      timestamp: "2025-01-09 14:31:02",
      action: "FRAMES_EXTRACTED",
      actor: "cloudrun:frame-extractor@v1.2.1",
      artifact: "428 frames",
      hash: "2e4b...8d",
      txHash: "0xdef...456",
    },
    {
      timestamp: "2025-01-09 14:33:45",
      action: "DETECTION_COMPLETED",
      actor: "vertex-ai:resnet50@v0.9.2",
      artifact: "detection results",
      hash: "3c5d...7e",
      txHash: "0x789...abc",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bukti Forensik Digital</h1>
          <p className="text-gray-600">
            Manajemen bukti digital dengan chain of custody berbasis blockchain sesuai standar ISO/IEC 27043
          </p>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Pencarian Kasus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="caseId">ID Kasus</Label>
                <Input id="caseId" placeholder="JJ-2025-001234" />
              </div>
              <div className="flex-1">
                <Label htmlFor="dateRange">Rentang Tanggal</Label>
                <Input id="dateRange" type="date" />
              </div>
              <div className="flex items-end">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Cari
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cases">Daftar Kasus</TabsTrigger>
            <TabsTrigger value="custody">Chain of Custody</TabsTrigger>
            <TabsTrigger value="reports">Laporan Forensik</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {forensicCases.map((case_) => (
                <Card key={case_.id} className="border-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{case_.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <span>ID: {case_.id}</span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {case_.createdAt}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={case_.status === "completed" ? "default" : "secondary"}>
                          {case_.status === "completed" ? "Selesai" : "Diproses"}
                        </Badge>
                        <Badge variant={case_.integrity === "verified" ? "default" : "destructive"}>
                          <Shield className="h-3 w-3 mr-1" />
                          {case_.integrity === "verified" ? "Terverifikasi" : "Belum Verifikasi"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Evidence Summary */}
                    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{case_.evidence.images}</div>
                        <p className="text-sm text-gray-600">Gambar</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{case_.evidence.videos}</div>
                        <p className="text-sm text-gray-600">Video</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{case_.evidence.accounts}</div>
                        <p className="text-sm text-gray-600">Akun</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{case_.evidence.watermarks}</div>
                        <p className="text-sm text-gray-600">Watermark</p>
                      </div>
                    </div>

                    {/* Blockchain Info */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Lock className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800">Blockchain Record</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-blue-600">TX Hash</p>
                          <p className="font-mono text-blue-800">{case_.blockchain.txHash}</p>
                        </div>
                        <div>
                          <p className="text-blue-600">Block</p>
                          <p className="font-mono text-blue-800">#{case_.blockchain.blockNumber}</p>
                        </div>
                        <div>
                          <p className="text-blue-600">Timestamp</p>
                          <p className="font-mono text-blue-800">{case_.blockchain.timestamp}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedCase(case_.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Lihat Detail
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Hash className="h-4 w-4 mr-2" />
                        Verifikasi Hash
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custody" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Chain of Custody - JJ-2025-001234</CardTitle>
                <CardDescription>Jejak audit lengkap untuk semua artefak digital dalam kasus ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chainOfCustody.map((entry, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{entry.action}</h4>
                          <Badge variant="outline">{entry.timestamp}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Actor:</strong> {entry.actor}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Artifact:</strong> {entry.artifact}
                        </p>
                        <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                          <p>
                            <strong>SHA3-256:</strong> {entry.hash}
                          </p>
                          <p>
                            <strong>TX Hash:</strong> {entry.txHash}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generator Laporan Forensik</CardTitle>
                <CardDescription>Buat laporan forensik digital yang sah untuk pengadilan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
                    <CardHeader className="text-center">
                      <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle>Laporan Lengkap</CardTitle>
                      <CardDescription>Laporan forensik komprehensif dengan semua bukti dan analisis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors cursor-pointer">
                    <CardHeader className="text-center">
                      <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <CardTitle>Sertifikat Integritas</CardTitle>
                      <CardDescription>Sertifikat digital dengan QR code untuk verifikasi blockchain</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Certificate
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Catatan Penting</h4>
                      <p className="text-sm text-amber-700">
                        Laporan forensik yang dihasilkan telah memenuhi standar ISO/IEC 27043 dan dapat digunakan
                        sebagai bukti digital yang sah di pengadilan. Setiap laporan dilengkapi dengan:
                      </p>
                      <ul className="text-sm text-amber-700 mt-2 ml-4 list-disc">
                        <li>Hash SHA-3 untuk verifikasi integritas</li>
                        <li>Timestamp terverifikasi dari blockchain</li>
                        <li>Chain of custody lengkap</li>
                        <li>Metadata teknis dan metodologi</li>
                      </ul>
                    </div>
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
