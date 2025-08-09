"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, LinkIcon, AlertTriangle, CheckCircle, ArrowLeft, Shield, FileText, Camera, Video } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-3xl text-green-800">Laporan Berhasil Dikirim</CardTitle>
            <CardDescription className="text-lg">
              Laporan Anda telah diterima dan sedang diproses oleh sistem AI JejakJudi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-600 font-medium">ID Laporan</p>
                  <p className="font-mono text-green-800">JJ-2025-001234</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Status</p>
                  <p className="text-green-800">Sedang Dianalisis AI</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Platform</p>
                  <p className="text-green-800">{formData.platform || "Instagram"}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Estimasi Selesai</p>
                  <p className="text-green-800">2-5 menit</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Proses Analisis Otomatis
              </h4>
              <div className="space-y-3 text-sm text-blue-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Content Fetcher: Mengunduh dan memvalidasi konten
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Frame Extractor: Ekstraksi frame video (2 fps)
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  ResNet-50: Deteksi watermark tersembunyi
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Tesseract OCR: Ekstraksi teks dan URL
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Graph Analytics: Analisis jaringan distribusi
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Link href="/" className="flex-1">
                <Button className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
              <Link href="/report" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Laporkan Konten Judi Online</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bantu kami mendeteksi dan melacak iklan judi online dengan melaporkan konten mencurigakan. Sistem AI kami
            akan menganalisis konten menggunakan <strong>ResNet-50</strong> dan <strong>Tesseract OCR</strong>, kemudian
            menyimpannya sebagai bukti forensik digital yang sah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Penting:</strong> Pastikan konten yang dilaporkan bersifat publik dan tidak melanggar privasi.
                Sistem hanya akan menganalisis metadata dan konten yang dapat diakses secara umum sesuai standar ISO/IEC
                27043.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-blue-600" />
                  Form Pelaporan Konten
                </CardTitle>
                <CardDescription>
                  Isi informasi di bawah ini untuk melaporkan konten yang mengandung iklan judi online
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                      <Label htmlFor="platform">Platform Media Sosial *</Label>
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
                        className={`cursor-pointer transition-all ${reportType === "upload" ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200" : "hover:bg-gray-50 border-gray-200"}`}
                        onClick={() => setReportType("upload")}
                      >
                        <CardHeader className="text-center pb-4">
                          <Upload className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                          <CardTitle className="text-lg">Upload File</CardTitle>
                          <CardDescription className="text-sm">
                            Upload gambar atau video yang mengandung iklan judi (Max 15MB)
                          </CardDescription>
                        </CardHeader>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${reportType === "url" ? "ring-2 ring-green-500 bg-green-50 border-green-200" : "hover:bg-gray-50 border-gray-200"}`}
                        onClick={() => setReportType("url")}
                      >
                        <CardHeader className="text-center pb-4">
                          <LinkIcon className="h-12 w-12 mx-auto text-green-600 mb-2" />
                          <CardTitle className="text-lg">Link URL</CardTitle>
                          <CardDescription className="text-sm">
                            Berikan link ke postingan atau konten mencurigakan
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>

                  {/* Upload Section */}
                  {reportType === "upload" && (
                    <div className="space-y-4">
                      <Label htmlFor="file">Upload File Bukti *</Label>
                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-blue-50">
                        <div className="flex justify-center space-x-4 mb-4">
                          <Camera className="h-8 w-8 text-blue-500" />
                          <Video className="h-8 w-8 text-blue-500" />
                        </div>
                        <p className="text-blue-700 mb-2 font-medium">Klik untuk upload atau drag & drop</p>
                        <p className="text-sm text-blue-600 mb-4">
                          Gambar: JPG, PNG, WEBP | Video: MP4, MOV, AVI (Max 15MB, 180 detik)
                        </p>
                        <Input type="file" className="mt-4 bg-white" accept="image/*,video/*" />

                        {isSubmitting && (
                          <div className="mt-4">
                            <Progress value={uploadProgress} className="w-full" />
                            <p className="text-sm text-blue-600 mt-2">Mengupload... {uploadProgress}%</p>
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
                        placeholder="https://instagram.com/p/... atau https://tiktok.com/@user/video/..."
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="text-sm"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        <strong>Pastikan link dapat diakses secara publik.</strong> Sistem akan menggunakan headless
                        browser untuk mengambil screenshot dan HTML dump sesuai standar forensik.
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Detail</Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan mengapa konten ini mencurigakan, pola yang Anda temukan, atau informasi tambahan yang relevan..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="contact">Kontak untuk Update Status</Label>
                    <Input
                      id="contact"
                      type="email"
                      placeholder="email@example.com (opsional)"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                    <p className="text-sm text-gray-500">
                      Email untuk menerima notifikasi status analisis dan hasil deteksi AI
                    </p>
                  </div>

                  <Button type="submit" className="w-full py-3 text-lg" disabled={!reportType || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Mengirim Laporan...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5 mr-2" />
                        Kirim Laporan ke Sistem AI
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proses Analisis AI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Content Fetcher</p>
                      <p className="text-gray-600">Unduh dan validasi konten</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Frame Extraction</p>
                      <p className="text-gray-600">Ekstrak frame video (2 fps)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium">ResNet-50 Detection</p>
                      <p className="text-gray-600">Deteksi watermark tersembunyi</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">4</span>
                    </div>
                    <div>
                      <p className="font-medium">OCR & Graph Analysis</p>
                      <p className="text-gray-600">Ekstraksi teks dan analisis jaringan</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistik Sistem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">2,847</div>
                    <p className="text-xs text-gray-600">Total Laporan</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">94.2%</div>
                    <p className="text-xs text-gray-600">Akurasi AI</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">1,234</div>
                    <p className="text-xs text-gray-600">Watermark Terdeteksi</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">567</div>
                    <p className="text-xs text-gray-600">Akun Teridentifikasi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keamanan Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Enkripsi KMS Google Cloud</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Chain of Custody Blockchain</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Standar ISO/IEC 27043</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>Hash SHA-3 Verification</span>
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
