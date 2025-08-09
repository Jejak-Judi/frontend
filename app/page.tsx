import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, FileText, Network, Shield, Eye } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">JejakJudi</h1>
                <p className="text-xs text-gray-500">Detektif Digital Anti-Judi Online</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/report" className="text-gray-600 hover:text-blue-600 transition-colors">
                Laporkan Konten
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Sistem Deteksi & Pelacakan
              <span className="block text-red-600">Iklan Judi Online</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Platform berbasis AI dengan teknologi <strong>ResNet-50</strong> dan <strong>Tesseract OCR</strong> untuk
              mendeteksi watermark tersembunyi, menganalisis jaringan distribusi menggunakan algoritma{" "}
              <strong>Louvain/Leiden</strong>, dan menghasilkan bukti forensik digital yang sah sesuai standar{" "}
              <strong>ISO/IEC 27043</strong> untuk penegakan hukum.
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <Link href="/report">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg">
                <AlertTriangle className="mr-3 h-6 w-6" />
                Laporkan Konten Mencurigakan
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent">
              <FileText className="mr-3 h-6 w-6" />
              Pelajari Lebih Lanjut
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">≥92%</div>
              <p className="text-sm text-gray-600">Akurasi Deteksi</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25K+</div>
              <p className="text-sm text-gray-600">Dataset Training</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">10K</div>
              <p className="text-sm text-gray-600">Laporan/Hari</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">3.8M+</div>
              <p className="text-sm text-gray-600">Situs Terblokir</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-red-800 mb-4">Darurat Digital Indonesia</h3>
            <p className="text-lg text-red-700 max-w-3xl mx-auto">
              Indonesia menghadapi krisis judi online dengan perputaran transaksi mencapai{" "}
              <strong>Rp1.200 triliun</strong>
              dan <strong>1.066.000 pemain</strong> aktif, 71% diantaranya berpenghasilan di bawah Rp5 juta per bulan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-red-200 bg-white">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-center text-red-800">Watermark Tersembunyi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 text-center">
                  Iklan judi menggunakan watermark dengan opasitas sangat rendah (5-30%) yang lolos dari deteksi
                  otomatis platform
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardHeader>
                <Network className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-center text-red-800">Jaringan Terkoordinasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 text-center">
                  Sindikat menggunakan jaringan akun yang saling terhubung untuk menyebarkan konten secara masif dan
                  terstruktur
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-center text-red-800">Bukti Digital Lemah</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 text-center">
                  Kurangnya chain of custody yang sah menyebabkan banyak kasus gagal di pengadilan karena bukti tidak
                  valid
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Solution */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Solusi Teknologi Canggih</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              JejakJudi menggunakan kombinasi AI, analisis jaringan, dan blockchain untuk memberantas judi online secara
              komprehensif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Deteksi AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  ResNet-50 + OpenCV untuk deteksi watermark dengan preprocessing CLAHE, bilateral filter, dan unsharp
                  mask
                </p>
                <div className="text-xs text-blue-600 font-medium">Patch 256×256 • Stride 128 • Threshold 0.80</div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-green-500 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">OCR Ekstraksi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Tesseract v5 fine-tuned untuk Bahasa Indonesia dan Inggris dengan confidence scoring
                </p>
                <div className="text-xs text-green-600 font-medium">
                  URL Detection • WA/Telegram • Domain Extraction
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-purple-500 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Analisis Graf</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  NetworkX dengan algoritma Louvain/Leiden untuk deteksi komunitas dan betweenness centrality
                </p>
                <div className="text-xs text-purple-600 font-medium">
                  Bipartite Graph • Community Detection • Key Actors
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-orange-500 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Chain of Custody</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Hyperledger Fabric blockchain untuk immutable evidence vault dengan SHA-3 hashing
                </p>
                <div className="text-xs text-orange-600 font-medium">
                  ISO/IEC 27043 • Forensic Ready • Court Admissible
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Arsitektur Microservices</h3>
            <p className="text-lg text-gray-600">
              Dibangun di atas Google Cloud Platform dengan skalabilitas dan keandalan tinggi
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Ingestion Layer
                </h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• Cloud API Gateway</div>
                  <div>• Cloud Functions (Validasi)</div>
                  <div>• Pub/Sub Messaging</div>
                  <div>• Content Fetcher (Cloud Run)</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Processing Engine
                </h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• Vertex AI Pipelines</div>
                  <div>• Frame Extractor (FFmpeg)</div>
                  <div>• Detection Engine (PyTorch)</div>
                  <div>• Graph Analytics (NetworkX)</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  Evidence Vault
                </h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• Cloud Storage (KMS Encrypted)</div>
                  <div>• Hyperledger Fabric</div>
                  <div>• Cloud SQL (Metadata)</div>
                  <div>• Forensic PDF Generator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Bergabunglah dalam Memerangi Judi Online</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Setiap laporan Anda membantu membangun Indonesia digital yang bersih dan aman. Sistem kami akan menganalisis
            konten secara otomatis dan menghasilkan bukti forensik yang sah.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/report">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                <AlertTriangle className="mr-3 h-6 w-6" />
                Mulai Melaporkan
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <FileText className="mr-3 h-6 w-6" />
              Panduan Lengkap
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold">JejakJudi</h3>
                  <p className="text-sm text-gray-400">Detektif Digital Anti-Judi Online</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Dikembangkan untuk GEMASTIK XVIII 2025 dengan tema "Pengembangan TIK untuk Mendukung Kemandirian Bangsa"
              </p>
              <div className="text-sm text-gray-500">
                <p>Universitas Andalas - Fakultas Teknologi Informasi</p>
                <p>Departemen Sistem Informasi</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Teknologi</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>ResNet-50 + OpenCV</div>
                <div>Tesseract OCR</div>
                <div>NetworkX + Louvain</div>
                <div>Hyperledger Fabric</div>
                <div>Google Cloud Platform</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Tim Pengembang</div>
                <div>M. Nouval Habibie</div>
                <div>Benni Putra Chaniago</div>
                <div>Aqima Adalahita</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2025 JejakJudi. Dikembangkan untuk memberantas judi online dan membangun Indonesia digital yang bersih.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
