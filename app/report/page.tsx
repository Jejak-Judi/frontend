"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Link2, AlertTriangle, CheckCircle, ArrowLeft, Shield, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function ReportPage() {
  const [reportType, setReportType] = useState<"upload" | "url" | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    description: "",
    reporterType: "",
    contact: "",
    urgency: "normal",
    contentType: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-sm border-gray-200">
          <CardHeader className="text-center border-b">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Image src="/images/jejakjudi.png" alt="JejakJudi" width={32} height={32} />
              <div>
                <h3 className="text-lg font-bold text-black">JejakJudi</h3>
                <p className="text-xs text-gray-600">Detektif Digital Anti-Judi</p>
              </div>
            </div>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-black">Laporan Berhasil Dikirim</CardTitle>
            <CardDescription>
              Laporan Anda telah diterima dan sedang diproses oleh sistem AI
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-medium">ID Laporan</p>
                  <p className="font-mono text-black">JJ-2025-001234</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Status</p>
                  <p className="text-black">Sedang Dianalisis</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Platform</p>
                  <p className="text-black">{formData.platform || "Instagram"}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Estimasi Selesai</p>
                  <p className="text-black">2-5 menit</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-black pl-4 py-2">
              <h4 className="font-semibold text-black mb-2">Proses Analisis</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Content Fetcher: Mengunduh dan memvalidasi konten</div>
                <div>• Frame Extractor: Ekstraksi frame video (2 fps)</div>
                <div>• ResNet-50: Deteksi watermark tersembunyi</div>
                <div>• OCR Analysis: Ekstraksi teks dan analisis jaringan</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
              <Link href="/report" className="flex-1">
                <Button className="w-full bg-black hover:bg-gray-800">
                  <FileText className="h-4 w-4 mr-2" />
                  Lapor Lagi
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Link>
            <div className="flex items-center space-x-3">
              <Image src="/images/jejakjudi.png" alt="JejakJudi" width={32} height={32} />
              <div>
                <h2 className="text-lg font-bold text-black">JejakJudi</h2>
                <p className="text-xs text-gray-600">Detektif Digital Anti-Judi</p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Laporkan Konten</h1>
          <p className="text-gray-600 max-w-2xl">
            Bantu kami mendeteksi dan melacak iklan judi online dengan melaporkan konten mencurigakan. 
            Sistem AI akan menganalisis konten menggunakan teknologi machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Alert className="mb-6 border-gray-200 bg-gray-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Penting:</strong> Pastikan konten yang dilaporkan bersifat publik dan tidak melanggar privasi.
              </AlertDescription>
            </Alert>

            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center text-xl">
                  <Shield className="h-5 w-5 mr-2" />
                  Form Pelaporan
                </CardTitle>
                <CardDescription>
                  Isi informasi di bawah ini untuk melaporkan konten yang mengandung iklan judi online
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Reporter Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reporterType">Jenis Pelapor *</Label>
                      <Select
                        value={formData.reporterType}
                        onValueChange={(value) => setFormData({ ...formData, reporterType: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis pelapor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Masyarakat Umum</SelectItem>
                          <SelectItem value="officer">Aparat Penegak Hukum</SelectItem>
                          <SelectItem value="analyst">Analis Digital</SelectItem>
                          <SelectItem value="researcher">Peneliti/Akademisi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">Tingkat Urgensi</Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkat urgensi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Rendah - Konten Mencurigakan</SelectItem>
                          <SelectItem value="normal">Normal - Kemungkinan Judi</SelectItem>
                          <SelectItem value="high">Tinggi - Jelas Promosi Judi</SelectItem>
                          <SelectItem value="critical">Kritis - Jaringan Besar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Platform & Content Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform *</Label>
                      <Select
                        value={formData.platform}
                        onValueChange={(value) => setFormData({ ...formData, platform: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter/X</SelectItem>
                          <SelectItem value="other">Platform Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contentType">Jenis Konten</Label>
                      <Select
                        value={formData.contentType}
                        onValueChange={(value) => setFormData({ ...formData, contentType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis konten" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Gambar/Foto</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="story">Story/Status</SelectItem>
                          <SelectItem value="comment">Komentar</SelectItem>
                          <SelectItem value="profile">Profil/Bio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Report Type Selection */}
                  <div className="space-y-4">
                    <Label>Metode Pelaporan *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card
                        className={`cursor-pointer transition-all hover:shadow-md ${reportType === "upload" ? "ring-2 ring-black bg-gray-50" : "border-gray-200"}`}
                        onClick={() => setReportType("upload")}
                      >
                        <CardHeader className="text-center p-4">
                          <Upload className="h-10 w-10 mx-auto text-black mb-2" />
                          <CardTitle className="text-base">Upload File</CardTitle>
                          <CardDescription className="text-sm">
                            Upload gambar atau video (Max 15MB)
                          </CardDescription>
                        </CardHeader>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all hover:shadow-md ${reportType === "url" ? "ring-2 ring-black bg-gray-50" : "border-gray-200"}`}
                        onClick={() => setReportType("url")}
                      >
                        <CardHeader className="text-center p-4">
                          <Link2 className="h-10 w-10 mx-auto text-black mb-2" />
                          <CardTitle className="text-base">Link URL</CardTitle>
                          <CardDescription className="text-sm">
                            Berikan link ke postingan mencurigakan
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>

                  {/* Upload Section */}
                  {reportType === "upload" && (
                    <div className="space-y-4">
                      <Label htmlFor="file">Upload File *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-700 mb-2">Klik untuk upload atau drag & drop</p>
                        <p className="text-sm text-gray-500 mb-4">
                          JPG, PNG, WEBP, MP4, MOV (Max 15MB)
                        </p>
                        <Input type="file" className="mt-4" accept="image/*,video/*" />

                        {isSubmitting && (
                          <div className="mt-4">
                            <Progress value={uploadProgress} className="w-full" />
                            <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* URL Section */}
                  {reportType === "url" && (
                    <div className="space-y-4">
                      <Label htmlFor="url">URL Konten *</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://instagram.com/p/..."
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        required
                      />
                      <p className="text-sm text-gray-500">
                        Pastikan link dapat diakses secara publik
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan mengapa konten ini mencurigakan..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="contact">Email Notifikasi (opsional)</Label>
                    <Input
                      id="contact"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-gray-800" 
                    disabled={!reportType || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Mengirim Laporan...
                      </>
                    ) : (
                      "Kirim Laporan"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Proses Analisis</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <p className="font-medium text-black">Content Validation</p>
                      <p className="text-gray-600">Validasi dan unduh konten</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <p className="font-medium text-black">AI Detection</p>
                      <p className="text-gray-600">Deteksi watermark dengan ResNet-50</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <p className="font-medium text-black">Text Analysis</p>
                      <p className="text-gray-600">OCR dan analisis konten</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <div>
                      <p className="font-medium text-black">Report Generation</p>
                      <p className="text-gray-600">Generate bukti forensik</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Statistik</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-black">2,847</div>
                    <p className="text-xs text-gray-600">Total Laporan</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-black">94.2%</div>
                    <p className="text-xs text-gray-600">Akurasi AI</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-black">1,234</div>
                    <p className="text-xs text-gray-600">Konten Terdeteksi</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-black">567</div>
                    <p className="text-xs text-gray-600">Akun Diblokir</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}