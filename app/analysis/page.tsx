"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Network, ArrowLeft, Download, Filter, Search, Eye } from "lucide-react"
import Link from "next/link"

export default function AnalysisPage() {
  const [selectedCommunity, setSelectedCommunity] = useState("all")

  const communities = [
    {
      id: "COMM_1",
      name: "Komunitas Slot Online",
      members: ["akun_slot88", "gacor_maxwin", "bonus_member"],
      size: 15,
      centrality: 0.42,
      activity: "Tinggi",
    },
    {
      id: "COMM_2",
      name: "Jaringan Togel",
      members: ["togel_hoki", "prediksi_jitu", "angka_main"],
      size: 12,
      centrality: 0.35,
      activity: "Sedang",
    },
    {
      id: "COMM_3",
      name: "Grup Casino",
      members: ["live_casino", "dealer_cantik", "jackpot_besar"],
      size: 8,
      centrality: 0.28,
      activity: "Rendah",
    },
  ]

  const keyAccounts = [
    {
      username: "akun_slot88",
      platform: "Instagram",
      followers: 45000,
      betweenness: 0.42,
      posts: 234,
      community: "COMM_1",
      risk: "Tinggi",
    },
    {
      username: "gacor_maxwin",
      platform: "TikTok",
      followers: 32000,
      betweenness: 0.38,
      posts: 189,
      community: "COMM_1",
      risk: "Tinggi",
    },
    {
      username: "togel_hoki",
      platform: "Instagram",
      followers: 28000,
      betweenness: 0.35,
      posts: 156,
      community: "COMM_2",
      risk: "Sedang",
    },
  ]

  const contentClusters = [
    {
      id: "wm_001",
      name: "Template Slot Gacor",
      members: 23,
      similarity: 0.89,
      platforms: ["Instagram", "TikTok"],
      keywords: ["SLOT88", "BONUS", "GACOR"],
    },
    {
      id: "wm_002",
      name: "Watermark Togel",
      members: 18,
      similarity: 0.85,
      platforms: ["Instagram"],
      keywords: ["TOGEL", "PREDIKSI", "ANGKA"],
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analisis Jaringan Distribusi</h1>
          <p className="text-gray-600">
            Visualisasi graf interaksi akun-konten dan identifikasi aktor kunci dalam jaringan distribusi
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter & Kontrol Analisis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pilih komunitas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Komunitas</SelectItem>
                  {communities.map((comm) => (
                    <SelectItem key={comm.id} value={comm.id}>
                      {comm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Cari Akun
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Graf
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="network">Visualisasi Graf</TabsTrigger>
            <TabsTrigger value="communities">Komunitas</TabsTrigger>
            <TabsTrigger value="accounts">Akun Kunci</TabsTrigger>
            <TabsTrigger value="clusters">Cluster Konten</TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Graf Jaringan Interaktif</CardTitle>
                <CardDescription>
                  Visualisasi hubungan antar akun dan konten menggunakan algoritma Louvain/Leiden
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Network className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Graf Jaringan Distribusi</h3>
                    <p className="text-gray-500 mb-4">Visualisasi interaktif menampilkan 89 akun dan 234 konten</p>
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Akun</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Konten</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Akun Kunci</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <p className="text-sm text-gray-600">Total Akun</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">234</div>
                    <p className="text-sm text-gray-600">Total Konten</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <p className="text-sm text-gray-600">Akun Kunci</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communities.map((community) => (
                <Card key={community.id} className="border-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <CardDescription>{community.id}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          community.activity === "Tinggi"
                            ? "destructive"
                            : community.activity === "Sedang"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {community.activity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Anggota</p>
                        <p className="font-semibold">{community.size} akun</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Centrality</p>
                        <p className="font-semibold">{community.centrality}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Akun Utama:</p>
                      <div className="space-y-1">
                        {community.members.map((member) => (
                          <Badge key={member} variant="outline" className="mr-1 mb-1">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Akun dengan Skor Centrality Tertinggi</CardTitle>
                <CardDescription>
                  Akun yang berperan sebagai jembatan antar komunitas dan penyebar kunci
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyAccounts.map((account) => (
                    <div key={account.username} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {account.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">@{account.username}</p>
                          <p className="text-sm text-gray-500">
                            {account.platform} • {account.followers.toLocaleString()} followers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Betweenness</p>
                          <p className="font-semibold">{account.betweenness}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Posts</p>
                          <p className="font-semibold">{account.posts}</p>
                        </div>
                        <Badge
                          variant={
                            account.risk === "Tinggi"
                              ? "destructive"
                              : account.risk === "Sedang"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {account.risk}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Profil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clusters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentClusters.map((cluster) => (
                <Card key={cluster.id} className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">{cluster.name}</CardTitle>
                    <CardDescription>ID: {cluster.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Anggota</p>
                        <p className="font-semibold">{cluster.members} watermark</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Similarity</p>
                        <p className="font-semibold">{(cluster.similarity * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Platform:</p>
                      <div className="flex space-x-2">
                        {cluster.platforms.map((platform) => (
                          <Badge key={platform} variant="outline">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        {cluster.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Sampel
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
