"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, FileText, Network, Shield, Eye, CheckCircle, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
//image
import Image from "next/image"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    accuracy: 0,
    dataset: 0,
    reports: 0,
    blocked: 0
  })

  useEffect(() => {
    setIsVisible(true)
    
    // Animated counters
    const timer = setTimeout(() => {
      const animateCounter = (target: number, key: string, duration = 2000) => {
        let start = 0
        const increment = target / (duration / 16)
        
        const counter = setInterval(() => {
          start += increment
          if (start >= target) {
            start = target
            clearInterval(counter)
          }
          
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(start)
          }))
        }, 16)
      }
      
      animateCounter(92, 'accuracy')
      animateCounter(25000, 'dataset')
      animateCounter(10000, 'reports')
      animateCounter(3800000, 'blocked')
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+'
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+'
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-black opacity-5 rounded-full blur-3xl animate-pulse transform -translate-y-40 translate-x-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-5 rounded-full blur-3xl animate-pulse transform translate-y-40 -translate-x-40"></div>
      </div>

      {/* Header */}
      <header className="relative border-b bg-white bg-opacity-80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className={`flex items-center space-x-3 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'opacity-0 transform -translate-x-10'}`}>
              
                <Image src="/images/jejakjudi.png" alt="JejakJudi" width={48} height={48} />

              <div>
                <h1 className="text-2xl font-bold text-black">JejakJudi</h1>
                <p className="text-sm text-gray-600 font-medium">Detektif Digital Anti-Judi Online</p>
              </div>
            </div>
            <nav className={`flex items-center space-x-6 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'opacity-0 transform translate-x-10'}`}>
              <Link href="/report" className="text-gray-600 hover:text-black transition-colors font-medium relative group">
                Laporkan Konten
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="hover:bg-black hover:text-white transition-all duration-300">
                  <Eye className="h-4 w-4 mr-2" />
                  Admin 
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-10'}`}>
            <div className="mb-8 inline-flex items-center px-4 py-2 bg-black bg-opacity-5 rounded-full text-sm font-medium text-white">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Teknologi AI Terdepan
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-black mb-8 leading-tight">
              Sistem Deteksi
              <span className="block text-gray-800">
                Iklan Judi Online
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Platform AI canggih untuk mendeteksi watermark tersembunyi dan menganalisis 
              jaringan distribusi konten judi ilegal dengan akurasi tinggi
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
              <Link href="/report">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <AlertTriangle className="mr-3 h-6 w-6" />
                  Laporkan Konten
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold transform hover:-translate-y-1 transition-all duration-300">
                <FileText className="mr-3 h-6 w-6" />
                Dokumentasi
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className={`text-center p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-8'}`}>
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-black" />
                <div className="text-3xl font-black text-black mb-2">
                  {counters.accuracy}%
                </div>
                <p className="text-sm text-gray-600 font-medium">Akurasi Deteksi</p>
              </div>
              
              <div className={`text-center p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-8'}`}>
                <FileText className="h-8 w-8 mx-auto mb-3 text-black" />
                <div className="text-3xl font-black text-black mb-2">
                  {formatNumber(counters.dataset)}
                </div>
                <p className="text-sm text-gray-600 font-medium">Dataset Training</p>
              </div>
              
              <div className={`text-center p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-8'}`}>
                <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-black" />
                <div className="text-3xl font-black text-black mb-2">
                  {formatNumber(counters.reports)}
                </div>
                <p className="text-sm text-gray-600 font-medium">Laporan/Hari</p>
              </div>
              
              <div className={`text-center p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-8'}`}>
                <Shield className="h-8 w-8 mx-auto mb-3 text-black" />
                <div className="text-3xl font-black text-black mb-2">
                  {formatNumber(counters.blocked)}
                </div>
                <p className="text-sm text-gray-600 font-medium">Situs Terblokir</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-10'}`}>
            <h3 className="text-4xl font-black text-black mb-6">Fitur Unggulan</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Teknologi AI dan analisis jaringan untuk deteksi konten judi online yang akurat dan efisien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-10'}`}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors">
                  Deteksi Watermark
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Menggunakan AI machine learning untuk mendeteksi watermark tersembunyi dalam gambar dan video dengan akurasi tinggi
                </p>
              </CardContent>
            </Card>

            <Card className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-10'}`}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Network className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors">
                  Analisis Jaringan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Visualisasi dan analisis mendalam jaringan distribusi konten untuk mengidentifikasi pola dan sumber penyebaran
                </p>
              </CardContent>
            </Card>

            <Card className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'opacity-0 transform translate-y-10'}`}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors">
                  Bukti Forensik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Menghasilkan bukti digital yang sah dan dapat dipertanggungjawabkan untuk keperluan hukum dan penegakan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-black mb-6">Bergabunglah dalam Pemberantasan Judi Online</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
            Laporkan konten mencurigakan dan bantu kami menciptakan internet yang lebih aman
          </p>
          <Link href="/report">
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transform hover:-translate-y-1 transition-all duration-300">
              <AlertTriangle className="mr-3 h-6 w-6" />
              Mulai Laporkan Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
              
                    <Image src="/images/jejakjudi.png" alt="JejakJudi" width={20} height={20} />
                
                  <h3 className="text-xl font-bold text-black">JejakJudi</h3>
                </div>
                <p className="text-gray-600 mb-4 max-w-md">
                  Platform AI untuk mendeteksi dan melacak iklan judi online. Dikembangkan untuk GEMASTIK XVIII 2025 oleh tim Universitas Andalas.
                </p>
              </div>
              
              {/* Links */}
              <div>
                <h4 className="font-semibold text-black mb-4">Platform</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Laporkan Konten</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Dokumentasi</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition-colors">API</a></li>
                </ul>
              </div>
              
              {/* Support */}
              <div>
                <h4 className="font-semibold text-black mb-4">Dukungan</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Bantuan</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Kontak</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2025 JejakJudi. Sistem deteksi iklan judi online.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Privasi</a>
                <a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Syarat</a>
                <a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Kebijakan</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}