"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Download, Filter, Eye, TrendingUp } from "lucide-react"

// Data dummy untuk network graph
const networkData = {
  nodes: [
    // Akun nodes
    {
      id: "acc_slot88",
      type: "account",
      platform: "IG",
      username: "slot88_gacor",
      followers: 45000,
      centrality: 0.42,
      community: "COMM_1",
    },
    {
      id: "acc_maxwin",
      type: "account",
      platform: "TT",
      username: "gacor_maxwin",
      followers: 32000,
      centrality: 0.38,
      community: "COMM_1",
    },
    {
      id: "acc_bonus",
      type: "account",
      platform: "IG",
      username: "bonus_member",
      followers: 28000,
      centrality: 0.35,
      community: "COMM_1",
    },
    {
      id: "acc_togel1",
      type: "account",
      platform: "IG",
      username: "togel_hoki",
      followers: 25000,
      centrality: 0.32,
      community: "COMM_2",
    },
    {
      id: "acc_togel2",
      type: "account",
      platform: "YT",
      username: "prediksi_jitu",
      followers: 18000,
      centrality: 0.28,
      community: "COMM_2",
    },
    {
      id: "acc_casino1",
      type: "account",
      platform: "IG",
      username: "live_casino",
      followers: 22000,
      centrality: 0.25,
      community: "COMM_3",
    },
    {
      id: "acc_casino2",
      type: "account",
      platform: "TT",
      username: "dealer_cantik",
      followers: 15000,
      centrality: 0.22,
      community: "COMM_3",
    },
    {
      id: "acc_jackpot",
      type: "account",
      platform: "IG",
      username: "jackpot_besar",
      followers: 12000,
      centrality: 0.18,
      community: "COMM_3",
    },

    // Content nodes
    {
      id: "cont_slot1",
      type: "content",
      hash: "sha3:abc123",
      platform: "IG",
      watermarks: 3,
      ocrText: "SLOT88 BONUS NEW MEMBER",
    },
    {
      id: "cont_slot2",
      type: "content",
      hash: "sha3:def456",
      platform: "TT",
      watermarks: 2,
      ocrText: "GACOR MAXWIN HARI INI",
    },
    {
      id: "cont_togel1",
      type: "content",
      hash: "sha3:ghi789",
      platform: "IG",
      watermarks: 1,
      ocrText: "TOGEL HONGKONG PREDIKSI",
    },
    {
      id: "cont_casino1",
      type: "content",
      hash: "sha3:jkl012",
      platform: "IG",
      watermarks: 4,
      ocrText: "LIVE CASINO DEALER CANTIK",
    },
  ],
  edges: [
    // Account -> Content relationships
    { src: "acc_slot88", dst: "cont_slot1", type: "posted", timestamp: "2025-01-09T10:00:00Z", weight: 1 },
    { src: "acc_maxwin", dst: "cont_slot1", type: "reposted", timestamp: "2025-01-09T10:30:00Z", weight: 0.8 },
    { src: "acc_bonus", dst: "cont_slot1", type: "reposted", timestamp: "2025-01-09T11:00:00Z", weight: 0.8 },

    { src: "acc_maxwin", dst: "cont_slot2", type: "posted", timestamp: "2025-01-09T12:00:00Z", weight: 1 },
    { src: "acc_slot88", dst: "cont_slot2", type: "reposted", timestamp: "2025-01-09T12:15:00Z", weight: 0.8 },

    { src: "acc_togel1", dst: "cont_togel1", type: "posted", timestamp: "2025-01-09T13:00:00Z", weight: 1 },
    { src: "acc_togel2", dst: "cont_togel1", type: "reposted", timestamp: "2025-01-09T13:30:00Z", weight: 0.8 },

    { src: "acc_casino1", dst: "cont_casino1", type: "posted", timestamp: "2025-01-09T14:00:00Z", weight: 1 },
    { src: "acc_casino2", dst: "cont_casino1", type: "reposted", timestamp: "2025-01-09T14:20:00Z", weight: 0.8 },
    { src: "acc_jackpot", dst: "cont_casino1", type: "reposted", timestamp: "2025-01-09T14:45:00Z", weight: 0.8 },
  ],
}

const communities = [
  {
    id: "COMM_1",
    name: "Komunitas Slot Online",
    members: ["acc_slot88", "acc_maxwin", "acc_bonus"],
    size: 3,
    centrality: 0.42,
    activity: "Tinggi",
    color: "#ef4444",
    description: "Jaringan akun yang fokus pada promosi slot online dengan watermark tersembunyi",
  },
  {
    id: "COMM_2",
    name: "Jaringan Togel",
    members: ["acc_togel1", "acc_togel2"],
    size: 2,
    centrality: 0.32,
    activity: "Sedang",
    color: "#f97316",
    description: "Komunitas yang menyebarkan prediksi togel dan link betting",
  },
  {
    id: "COMM_3",
    name: "Grup Casino Live",
    members: ["acc_casino1", "acc_casino2", "acc_jackpot"],
    size: 3,
    centrality: 0.25,
    activity: "Rendah",
    color: "#eab308",
    description: "Jaringan promosi casino live dengan fokus pada dealer dan jackpot",
  },
]

const keyActors = networkData.nodes
  .filter((node) => node.type === "account")
  .sort((a, b) => b.centrality - a.centrality)
  .slice(0, 5)

export default function NetworkPage() {
  const [selectedCommunity, setSelectedCommunity] = useState("all")
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const filteredNodes =
    selectedCommunity === "all"
      ? networkData.nodes
      : networkData.nodes.filter(
          (node) => node.type === "content" || (node.type === "account" && node.community === selectedCommunity),
        )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Network Analysis</h1>
          <p className="text-slate-600">
            Visualisasi graf jaringan distribusi konten menggunakan algoritma Louvain/Leiden
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Graph
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <Card>
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
              <TrendingUp className="h-4 w-4 mr-2" />
              Analyze Trends
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="visualization" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visualization">Graph Visualization</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="actors">Key Actors</TabsTrigger>
          <TabsTrigger value="metrics">Network Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Graph Visualization */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Interactive Network Graph</CardTitle>
                <CardDescription>
                  Graf bipartit menampilkan hubungan akun-konten dengan community detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border-2 border-slate-200 flex items-center justify-center relative overflow-hidden">
                  {/* Network Graph Simulation */}
                  <div className="absolute inset-0 p-6">
                    {/* Community 1 - Slot Online (Red cluster) - Top Left */}
                    <div className="absolute top-12 left-12">
                      {/* Main hub account */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse">
                          <div className="text-center">
                            <div className="text-xs">SLOT</div>
                            <div className="text-xs">88</div>
                          </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-red-700 whitespace-nowrap">
                          @slot88_gacor
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          45K
                        </div>
                      </div>

                      {/* Connected accounts */}
                      <div className="absolute top-20 -left-8">
                        <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                          GM
                        </div>
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-red-600 whitespace-nowrap">
                          @gacor_maxwin
                        </div>
                      </div>

                      <div className="absolute top-20 left-20">
                        <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                          BM
                        </div>
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-red-600 whitespace-nowrap">
                          @bonus_member
                        </div>
                      </div>

                      {/* Content nodes */}
                      <div className="absolute top-32 left-8">
                        <div className="w-8 h-8 bg-red-200 rounded-sm flex items-center justify-center shadow-sm">
                          <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-red-500 whitespace-nowrap">
                          SLOT88 content
                        </div>
                      </div>
                    </div>

                    {/* Community 2 - Togel (Orange cluster) - Top Right */}
                    <div className="absolute top-16 right-16">
                      {/* Main hub account */}
                      <div className="relative">
                        <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          <div className="text-center">
                            <div className="text-xs">TGL</div>
                            <div className="text-xs">HK</div>
                          </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-orange-700 whitespace-nowrap">
                          @togel_hoki
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          25K
                        </div>
                      </div>

                      {/* Connected account */}
                      <div className="absolute top-16 -right-12">
                        <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                          PJ
                        </div>
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-orange-600 whitespace-nowrap">
                          @prediksi_jitu
                        </div>
                      </div>

                      {/* Content node */}
                      <div className="absolute top-28 -right-4">
                        <div className="w-8 h-8 bg-orange-200 rounded-sm flex items-center justify-center shadow-sm">
                          <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-orange-500 whitespace-nowrap">
                          TOGEL content
                        </div>
                      </div>
                    </div>

                    {/* Community 3 - Casino (Yellow cluster) - Bottom Center */}
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                      {/* Main hub account */}
                      <div className="relative">
                        <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          <div className="text-center">
                            <div className="text-xs">LIVE</div>
                            <div className="text-xs">CSN</div>
                          </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-yellow-700 whitespace-nowrap">
                          @live_casino
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          22K
                        </div>
                      </div>

                      {/* Connected accounts */}
                      <div className="absolute top-0 -left-16">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                          DC
                        </div>
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-yellow-600 whitespace-nowrap">
                          @dealer_cantik
                        </div>
                      </div>

                      <div className="absolute top-0 right-16">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                          JB
                        </div>
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-yellow-600 whitespace-nowrap">
                          @jackpot_besar
                        </div>
                      </div>

                      {/* Content node */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 bg-yellow-200 rounded-sm flex items-center justify-center shadow-sm">
                          <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-yellow-500 whitespace-nowrap">
                          CASINO content
                        </div>
                      </div>
                    </div>

                    {/* Connection lines using SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                      <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#64748b" opacity="0.6" />
                        </marker>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Intra-community connections */}
                      {/* Slot community connections */}
                      <line
                        x1="120"
                        y1="80"
                        x2="100"
                        y2="120"
                        stroke="#ef4444"
                        strokeWidth="3"
                        opacity="0.8"
                        filter="url(#glow)"
                      />
                      <line
                        x1="120"
                        y1="80"
                        x2="140"
                        y2="120"
                        stroke="#ef4444"
                        strokeWidth="3"
                        opacity="0.8"
                        filter="url(#glow)"
                      />
                      <line
                        x1="120"
                        y1="80"
                        x2="120"
                        y2="150"
                        stroke="#ef4444"
                        strokeWidth="2"
                        opacity="0.6"
                        markerEnd="url(#arrowhead)"
                      />

                      {/* Togel community connections */}
                      <line
                        x1="480"
                        y1="90"
                        x2="500"
                        y2="130"
                        stroke="#f97316"
                        strokeWidth="3"
                        opacity="0.8"
                        filter="url(#glow)"
                      />
                      <line
                        x1="480"
                        y1="90"
                        x2="480"
                        y2="140"
                        stroke="#f97316"
                        strokeWidth="2"
                        opacity="0.6"
                        markerEnd="url(#arrowhead)"
                      />

                      {/* Casino community connections */}
                      <line
                        x1="300"
                        y1="280"
                        x2="270"
                        y2="280"
                        stroke="#eab308"
                        strokeWidth="3"
                        opacity="0.8"
                        filter="url(#glow)"
                      />
                      <line
                        x1="300"
                        y1="280"
                        x2="330"
                        y2="280"
                        stroke="#eab308"
                        strokeWidth="3"
                        opacity="0.8"
                        filter="url(#glow)"
                      />
                      <line
                        x1="300"
                        y1="280"
                        x2="300"
                        y2="250"
                        stroke="#eab308"
                        strokeWidth="2"
                        opacity="0.6"
                        markerEnd="url(#arrowhead)"
                      />

                      {/* Inter-community weak connections */}
                      <line
                        x1="150"
                        y1="120"
                        x2="450"
                        y2="130"
                        stroke="#64748b"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        opacity="0.4"
                      />
                      <line
                        x1="200"
                        y1="150"
                        x2="280"
                        y2="250"
                        stroke="#64748b"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        opacity="0.3"
                      />
                      <line
                        x1="450"
                        y1="140"
                        x2="320"
                        y2="260"
                        stroke="#64748b"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        opacity="0.3"
                      />
                    </svg>

                    {/* Floating info panels */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                      <div className="text-xs font-medium text-gray-700 mb-1">Community Detection</div>
                      <div className="text-xs text-gray-600">Louvain Algorithm</div>
                      <div className="text-xs text-gray-600">Modularity: 0.72</div>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                      <div className="text-xs font-medium text-gray-700 mb-1">Graph Metrics</div>
                      <div className="text-xs text-gray-600">Density: 0.34</div>
                      <div className="text-xs text-gray-600">Avg Path: 2.8</div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                      <div className="text-xs font-medium text-gray-700 mb-2">Node Types</div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>Accounts</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                          <span>Content</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center overlay info - Improved positioning */}
                  <div className="absolute bottom-6 right-6 pointer-events-none" style={{ zIndex: 2 }}>
                    <div className="text-left bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-slate-300 max-w-xs">
                      <div className="flex items-center mb-2">
                        <Network className="h-5 w-5 text-slate-600 mr-2" />
                        <h3 className="text-sm font-semibold text-slate-800">Analysis Results</h3>
                      </div>
                      <div className="text-xs text-slate-600 mb-3 space-y-1">
                        <p>
                          {filteredNodes.filter((n) => n.type === "account").length} accounts •{" "}
                          {filteredNodes.filter((n) => n.type === "content").length} content
                        </p>
                        <p>{networkData.edges.length} connections detected</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <span className="font-medium">Slot</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-orange-500 rounded-full shadow-sm"></div>
                          <span className="font-medium">Togel</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <span className="font-medium">Casino</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Network Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {networkData.nodes.filter((n) => n.type === "account").length}
                    </div>
                    <p className="text-sm text-blue-700">Total Akun</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {networkData.nodes.filter((n) => n.type === "content").length}
                    </div>
                    <p className="text-sm text-green-700">Total Konten</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{communities.length}</div>
                    <p className="text-sm text-purple-700">Communities</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{networkData.edges.length}</div>
                    <p className="text-sm text-orange-700">Connections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communities.map((community) => (
              <Card key={community.id} className="border-2" style={{ borderColor: community.color + "40" }}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: community.color }}></div>
                        {community.name}
                      </CardTitle>
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
                  <p className="text-sm text-gray-600">{community.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Anggota</p>
                      <p className="font-semibold">{community.size} akun</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Max Centrality</p>
                      <p className="font-semibold">{community.centrality}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Akun Utama:</p>
                    <div className="space-y-1">
                      {community.members.map((memberId) => {
                        const member = networkData.nodes.find((n) => n.id === memberId)
                        return member ? (
                          <div key={memberId} className="flex items-center justify-between text-xs">
                            <span className="font-mono">@{member.username}</span>
                            <Badge variant="outline" className="text-xs">
                              {member.platform}
                            </Badge>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Analyze Community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Actors - Betweenness Centrality</CardTitle>
              <CardDescription>
                Akun dengan skor centrality tertinggi yang berperan sebagai jembatan antar komunitas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyActors.map((actor, index) => (
                  <div
                    key={actor.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: communities.find((c) => c.id === actor.community)?.color || "#gray",
                          }}
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">@{actor.username}</p>
                        <p className="text-sm text-gray-500">
                          {actor.platform} • {actor.followers?.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">{actor.centrality}</p>
                        <p className="text-xs text-gray-500">Centrality Score</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{communities.find((c) => c.id === actor.community)?.name}</p>
                        <p className="text-xs text-gray-500">Community</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Graph Metrics</CardTitle>
                <CardDescription>Statistik topologi jaringan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Density</span>
                    <span className="font-bold">0.34</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Clustering Coefficient</span>
                    <span className="font-bold">0.67</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Average Path Length</span>
                    <span className="font-bold">2.8</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Modularity</span>
                    <span className="font-bold">0.72</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Quality</CardTitle>
                <CardDescription>Metrik kualitas deteksi komunitas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communities.map((community) => (
                    <div key={community.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: community.color }}></div>
                          {community.name}
                        </span>
                        <span className="text-sm font-bold">{community.centrality}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor: community.color,
                            width: `${community.centrality * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
