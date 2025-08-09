"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Download, Filter, Eye, TrendingUp } from "lucide-react"

// Data dummy untuk network graph - diperbaharui untuk pola yang lebih bagus
const networkData = {
  nodes: [
    // Community 1 - Slot Online Network (High Activity)
    {
      id: "acc_slot_king",
      type: "account",
      platform: "IG",
      username: "slot_king88",
      followers: 85000,
      centrality: 0.78,
      community: "COMM_1",
    },
    {
      id: "acc_gacor_master",
      type: "account",
      platform: "TT",
      username: "gacor_master",
      followers: 62000,
      centrality: 0.65,
      community: "COMM_1",
    },
    {
      id: "acc_slot_pro",
      type: "account",
      platform: "IG",
      username: "slot_pro_777",
      followers: 45000,
      centrality: 0.58,
      community: "COMM_1",
    },
    {
      id: "acc_bonus_hunter",
      type: "account",
      platform: "TT",
      username: "bonus_hunter",
      followers: 38000,
      centrality: 0.52,
      community: "COMM_1",
    },
    {
      id: "acc_slot_viral",
      type: "account",
      platform: "YT",
      username: "slot_viral_id",
      followers: 28000,
      centrality: 0.45,
      community: "COMM_1",
    },
    {
      id: "acc_maxwin_daily",
      type: "account",
      platform: "IG",
      username: "maxwin_daily",
      followers: 22000,
      centrality: 0.38,
      community: "COMM_1",
    },

    // Community 2 - Togel & Lottery Network (Medium Activity)
    {
      id: "acc_togel_master",
      type: "account",
      platform: "IG",
      username: "togel_master_hk",
      followers: 55000,
      centrality: 0.62,
      community: "COMM_2",
    },
    {
      id: "acc_prediksi_pro",
      type: "account",
      platform: "TT",
      username: "prediksi_pro",
      followers: 42000,
      centrality: 0.55,
      community: "COMM_2",
    },
    {
      id: "acc_angka_jitu",
      type: "account",
      platform: "YT",
      username: "angka_jitu_sgp",
      followers: 35000,
      centrality: 0.48,
      community: "COMM_2",
    },
    {
      id: "acc_togel_viral",
      type: "account",
      platform: "IG",
      username: "togel_viral_88",
      followers: 29000,
      centrality: 0.42,
      community: "COMM_2",
    },
    {
      id: "acc_shio_expert",
      type: "account",
      platform: "TT",
      username: "shio_expert",
      followers: 18000,
      centrality: 0.35,
      community: "COMM_2",
    },

    // Community 3 - Casino Live Network (Lower Activity)
    {
      id: "acc_live_casino",
      type: "account",
      platform: "IG",
      username: "live_casino_id",
      followers: 48000,
      centrality: 0.58,
      community: "COMM_3",
    },
    {
      id: "acc_dealer_cantik",
      type: "account",
      platform: "TT",
      username: "dealer_cantik_88",
      followers: 32000,
      centrality: 0.45,
      community: "COMM_3",
    },
    {
      id: "acc_jackpot_king",
      type: "account",
      platform: "IG",
      username: "jackpot_king",
      followers: 25000,
      centrality: 0.38,
      community: "COMM_3",
    },
    {
      id: "acc_casino_viral",
      type: "account",
      platform: "YT",
      username: "casino_viral",
      followers: 19000,
      centrality: 0.32,
      community: "COMM_3",
    },

    // Community 4 - Sports Betting Network (New)
    {
      id: "acc_sportsbet_pro",
      type: "account",
      platform: "IG",
      username: "sportsbet_pro",
      followers: 39000,
      centrality: 0.52,
      community: "COMM_4",
    },
    {
      id: "acc_soccer_bet",
      type: "account",
      platform: "TT",
      username: "soccer_bet_id",
      followers: 28000,
      centrality: 0.45,
      community: "COMM_4",
    },
    {
      id: "acc_odds_master",
      type: "account",
      platform: "YT",
      username: "odds_master",
      followers: 21000,
      centrality: 0.38,
      community: "COMM_4",
    },

    // Bridge/Connector Accounts (Cross-community)
    {
      id: "acc_gambling_hub",
      type: "account",
      platform: "IG",
      username: "gambling_hub_id",
      followers: 78000,
      centrality: 0.85,
      community: "COMM_BRIDGE",
    },
    {
      id: "acc_betting_news",
      type: "account",
      platform: "TT",
      username: "betting_news",
      followers: 52000,
      centrality: 0.72,
      community: "COMM_BRIDGE",
    },

    // Content nodes - lebih banyak dan beragam
    {
      id: "cont_slot_promo1",
      type: "content",
      hash: "sha3:abc123",
      platform: "IG",
      watermarks: 5,
      ocrText: "SLOT88 BONUS NEW MEMBER 100%",
    },
    {
      id: "cont_slot_promo2",
      type: "content",
      hash: "sha3:def456",
      platform: "TT",
      watermarks: 4,
      ocrText: "GACOR MAXWIN HARI INI SLOT",
    },
    {
      id: "cont_slot_viral",
      type: "content",
      hash: "sha3:ghi789",
      platform: "YT",
      watermarks: 3,
      ocrText: "VIRAL JACKPOT 500 JUTA",
    },
    {
      id: "cont_togel_hk",
      type: "content",
      hash: "sha3:jkl012",
      platform: "IG",
      watermarks: 2,
      ocrText: "TOGEL HONGKONG PREDIKSI HARI INI",
    },
    {
      id: "cont_togel_sgp",
      type: "content",
      hash: "sha3:mno345",
      platform: "TT",
      watermarks: 3,
      ocrText: "SINGAPORE POOLS ANGKA JITU",
    },
    {
      id: "cont_casino_live",
      type: "content",
      hash: "sha3:pqr678",
      platform: "IG",
      watermarks: 4,
      ocrText: "LIVE CASINO DEALER CANTIK 24 JAM",
    },
    {
      id: "cont_jackpot_casino",
      type: "content",
      hash: "sha3:stu901",
      platform: "YT",
      watermarks: 2,
      ocrText: "JACKPOT CASINO 1 MILIAR",
    },
    {
      id: "cont_sports_bet",
      type: "content",
      hash: "sha3:vwx234",
      platform: "IG",
      watermarks: 3,
      ocrText: "TARUHAN BOLA ODDS TERBAIK",
    },
    {
      id: "cont_soccer_tips",
      type: "content",
      hash: "sha3:yzab567",
      platform: "TT",
      watermarks: 1,
      ocrText: "TIPS JITU TARUHAN SEPAK BOLA",
    },
    {
      id: "cont_promo_mix",
      type: "content",
      hash: "sha3:cdef890",
      platform: "IG",
      watermarks: 6,
      ocrText: "PROMO GABUNGAN SLOT TOGEL CASINO",
    },
  ],
  edges: [
    // Slot Community (COMM_1) - Dense internal connections
    { src: "acc_slot_king", dst: "cont_slot_promo1", type: "posted", timestamp: "2025-01-09T08:00:00Z", weight: 1 },
    { src: "acc_gacor_master", dst: "cont_slot_promo1", type: "reposted", timestamp: "2025-01-09T08:15:00Z", weight: 0.9 },
    { src: "acc_slot_pro", dst: "cont_slot_promo1", type: "reposted", timestamp: "2025-01-09T08:30:00Z", weight: 0.8 },
    { src: "acc_bonus_hunter", dst: "cont_slot_promo1", type: "reposted", timestamp: "2025-01-09T08:45:00Z", weight: 0.7 },
    
    { src: "acc_gacor_master", dst: "cont_slot_promo2", type: "posted", timestamp: "2025-01-09T09:00:00Z", weight: 1 },
    { src: "acc_slot_viral", dst: "cont_slot_promo2", type: "reposted", timestamp: "2025-01-09T09:20:00Z", weight: 0.8 },
    { src: "acc_maxwin_daily", dst: "cont_slot_promo2", type: "reposted", timestamp: "2025-01-09T09:40:00Z", weight: 0.7 },
    
    { src: "acc_slot_viral", dst: "cont_slot_viral", type: "posted", timestamp: "2025-01-09T10:00:00Z", weight: 1 },
    { src: "acc_slot_king", dst: "cont_slot_viral", type: "reposted", timestamp: "2025-01-09T10:15:00Z", weight: 0.9 },
    { src: "acc_slot_pro", dst: "cont_slot_viral", type: "reposted", timestamp: "2025-01-09T10:30:00Z", weight: 0.8 },

    // Internal slot community cross-references
    { src: "acc_slot_king", dst: "acc_gacor_master", type: "mention", timestamp: "2025-01-09T11:00:00Z", weight: 0.6 },
    { src: "acc_gacor_master", dst: "acc_slot_pro", type: "collab", timestamp: "2025-01-09T11:30:00Z", weight: 0.7 },
    { src: "acc_bonus_hunter", dst: "acc_maxwin_daily", type: "mention", timestamp: "2025-01-09T12:00:00Z", weight: 0.5 },

    // Togel Community (COMM_2) - Medium density
    { src: "acc_togel_master", dst: "cont_togel_hk", type: "posted", timestamp: "2025-01-09T13:00:00Z", weight: 1 },
    { src: "acc_prediksi_pro", dst: "cont_togel_hk", type: "reposted", timestamp: "2025-01-09T13:20:00Z", weight: 0.8 },
    { src: "acc_angka_jitu", dst: "cont_togel_hk", type: "reposted", timestamp: "2025-01-09T13:40:00Z", weight: 0.7 },
    
    { src: "acc_angka_jitu", dst: "cont_togel_sgp", type: "posted", timestamp: "2025-01-09T14:00:00Z", weight: 1 },
    { src: "acc_togel_viral", dst: "cont_togel_sgp", type: "reposted", timestamp: "2025-01-09T14:25:00Z", weight: 0.8 },
    { src: "acc_shio_expert", dst: "cont_togel_sgp", type: "reposted", timestamp: "2025-01-09T14:50:00Z", weight: 0.6 },

    // Casino Community (COMM_3) - Lower density
    { src: "acc_live_casino", dst: "cont_casino_live", type: "posted", timestamp: "2025-01-09T15:00:00Z", weight: 1 },
    { src: "acc_dealer_cantik", dst: "cont_casino_live", type: "reposted", timestamp: "2025-01-09T15:30:00Z", weight: 0.8 },
    
    { src: "acc_jackpot_king", dst: "cont_jackpot_casino", type: "posted", timestamp: "2025-01-09T16:00:00Z", weight: 1 },
    { src: "acc_casino_viral", dst: "cont_jackpot_casino", type: "reposted", timestamp: "2025-01-09T16:20:00Z", weight: 0.7 },

    // Sports Betting Community (COMM_4)
    { src: "acc_sportsbet_pro", dst: "cont_sports_bet", type: "posted", timestamp: "2025-01-09T17:00:00Z", weight: 1 },
    { src: "acc_soccer_bet", dst: "cont_sports_bet", type: "reposted", timestamp: "2025-01-09T17:15:00Z", weight: 0.8 },
    { src: "acc_odds_master", dst: "cont_sports_bet", type: "reposted", timestamp: "2025-01-09T17:30:00Z", weight: 0.7 },
    
    { src: "acc_soccer_bet", dst: "cont_soccer_tips", type: "posted", timestamp: "2025-01-09T18:00:00Z", weight: 1 },
    { src: "acc_sportsbet_pro", dst: "cont_soccer_tips", type: "reposted", timestamp: "2025-01-09T18:20:00Z", weight: 0.8 },

    // Bridge connections - Cross-community hub accounts
    { src: "acc_gambling_hub", dst: "cont_promo_mix", type: "posted", timestamp: "2025-01-09T19:00:00Z", weight: 1 },
    { src: "acc_slot_king", dst: "cont_promo_mix", type: "reposted", timestamp: "2025-01-09T19:15:00Z", weight: 0.9 },
    { src: "acc_togel_master", dst: "cont_promo_mix", type: "reposted", timestamp: "2025-01-09T19:30:00Z", weight: 0.8 },
    { src: "acc_live_casino", dst: "cont_promo_mix", type: "reposted", timestamp: "2025-01-09T19:45:00Z", weight: 0.7 },
    { src: "acc_sportsbet_pro", dst: "cont_promo_mix", type: "reposted", timestamp: "2025-01-09T20:00:00Z", weight: 0.6 },

    // Inter-community weak connections (bridge ties)
    { src: "acc_gambling_hub", dst: "acc_slot_king", type: "mention", timestamp: "2025-01-09T20:30:00Z", weight: 0.5 },
    { src: "acc_gambling_hub", dst: "acc_togel_master", type: "mention", timestamp: "2025-01-09T21:00:00Z", weight: 0.5 },
    { src: "acc_gambling_hub", dst: "acc_live_casino", type: "collab", timestamp: "2025-01-09T21:30:00Z", weight: 0.6 },
    { src: "acc_betting_news", dst: "acc_sportsbet_pro", type: "mention", timestamp: "2025-01-09T22:00:00Z", weight: 0.5 },
    
    // Cross-community content sharing (creates interesting patterns)
    { src: "acc_betting_news", dst: "cont_slot_viral", type: "reposted", timestamp: "2025-01-09T22:30:00Z", weight: 0.4 },
    { src: "acc_slot_pro", dst: "cont_casino_live", type: "reposted", timestamp: "2025-01-09T23:00:00Z", weight: 0.3 },
    { src: "acc_togel_viral", dst: "cont_sports_bet", type: "reposted", timestamp: "2025-01-09T23:30:00Z", weight: 0.3 },
  ],
}

const communities = [
  {
    id: "COMM_1",
    name: "Jaringan Slot Online",
    members: ["acc_slot_king", "acc_gacor_master", "acc_slot_pro", "acc_bonus_hunter", "acc_slot_viral", "acc_maxwin_daily"],
    size: 6,
    centrality: 0.78,
    activity: "Sangat Tinggi",
    color: "#ef4444",
    description: "Jaringan besar akun slot online dengan koneksi internal yang sangat kuat dan distribusi konten viral",
  },
  {
    id: "COMM_2",
    name: "Komunitas Togel & Prediksi",
    members: ["acc_togel_master", "acc_prediksi_pro", "acc_angka_jitu", "acc_togel_viral", "acc_shio_expert"],
    size: 5,
    centrality: 0.62,
    activity: "Tinggi",
    color: "#f97316",
    description: "Komunitas prediksi togel dengan fokus pada analisis angka dan ramalan shio",
  },
  {
    id: "COMM_3",
    name: "Grup Casino Live",
    members: ["acc_live_casino", "acc_dealer_cantik", "acc_jackpot_king", "acc_casino_viral"],
    size: 4,
    centrality: 0.58,
    activity: "Sedang",
    color: "#eab308",
    description: "Jaringan promosi casino live dengan fokus pada dealer cantik dan jackpot besar",
  },
  {
    id: "COMM_4",
    name: "Sports Betting Network",
    members: ["acc_sportsbet_pro", "acc_soccer_bet", "acc_odds_master"],
    size: 3,
    centrality: 0.52,
    activity: "Sedang",
    color: "#22c55e",
    description: "Komunitas taruhan olahraga dengan spesialisasi sepak bola dan analisis odds",
  },
  {
    id: "COMM_BRIDGE",
    name: "Hub Connector",
    members: ["acc_gambling_hub", "acc_betting_news"],
    size: 2,
    centrality: 0.85,
    activity: "Sangat Tinggi",
    color: "#8b5cf6",
    description: "Akun penghubung utama yang mengintegrasikan semua komunitas gambling",
  },
]

const keyActors = networkData.nodes
  .filter((node) => node.type === "account")
  .sort((a, b) => (b.centrality || 0) - (a.centrality || 0))
  .slice(0, 5)

// Canvas Network Graph Component
function NetworkCanvas({ nodes, edges, communities, selectedCommunity }: {
  nodes: any[]
  edges: any[]
  communities: any[]
  selectedCommunity: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  // Posisi nodes berdasarkan community dengan force-directed layout
  const nodePositions = useRef<Map<string, { x: number; y: number; vx: number; vy: number }>>(new Map())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Initialize node positions
    const filteredNodes = selectedCommunity === "all" 
      ? nodes 
      : nodes.filter(node => node.type === "content" || (node.type === "account" && node.community === selectedCommunity))

    filteredNodes.forEach((node, index) => {
      if (!nodePositions.current.has(node.id)) {
        const communityIndex = communities.findIndex(c => c.id === node.community)
        
        if (node.type === "account") {
          let x, y
          
          // Posisikan berdasarkan community dengan pola yang lebih menarik
          switch (node.community) {
            case "COMM_1": // Slot - Kiri atas, cluster besar
              const slotAngle = (index * Math.PI / 3) + Math.PI / 6
              const slotRadius = 100 + (node.centrality * 50)
              x = rect.width * 0.25 + Math.cos(slotAngle) * slotRadius
              y = rect.height * 0.3 + Math.sin(slotAngle) * slotRadius
              break
              
            case "COMM_2": // Togel - Kanan atas
              const togelAngle = (index * Math.PI / 2.5) + Math.PI / 4
              const togelRadius = 80 + (node.centrality * 40)
              x = rect.width * 0.75 + Math.cos(togelAngle) * togelRadius
              y = rect.height * 0.25 + Math.sin(togelAngle) * togelRadius
              break
              
            case "COMM_3": // Casino - Kiri bawah
              const casinoAngle = (index * Math.PI / 2) + Math.PI
              const casinoRadius = 70 + (node.centrality * 30)
              x = rect.width * 0.3 + Math.cos(casinoAngle) * casinoRadius
              y = rect.height * 0.75 + Math.sin(casinoAngle) * casinoRadius
              break
              
            case "COMM_4": // Sports - Kanan bawah
              const sportsAngle = (index * Math.PI / 1.5) + Math.PI * 1.5
              const sportsRadius = 60 + (node.centrality * 35)
              x = rect.width * 0.7 + Math.cos(sportsAngle) * sportsRadius
              y = rect.height * 0.7 + Math.sin(sportsAngle) * sportsRadius
              break
              
            case "COMM_BRIDGE": // Bridge - Tengah dengan radius besar
              const bridgeAngle = index * Math.PI
              const bridgeRadius = 40 + (node.centrality * 20)
              x = rect.width * 0.5 + Math.cos(bridgeAngle) * bridgeRadius
              y = rect.height * 0.5 + Math.sin(bridgeAngle) * bridgeRadius
              break
              
            default:
              const defaultAngle = (communityIndex * 2 * Math.PI / communities.length) + (index * 0.3)
              const defaultRadius = 100
              x = rect.width / 2 + Math.cos(defaultAngle) * defaultRadius
              y = rect.height / 2 + Math.sin(defaultAngle) * defaultRadius
          }
          
          nodePositions.current.set(node.id, { x, y, vx: 0, vy: 0 })
          
        } else if (node.type === "content") {
          // Content nodes ditempatkan dekat dengan account yang posting mereka
          const relatedEdges = networkData.edges.filter(e => e.dst === node.id && e.type === "posted")
          if (relatedEdges.length > 0) {
            const parentAccountId = relatedEdges[0].src
            const parentPos = nodePositions.current.get(parentAccountId)
            
            if (parentPos) {
              // Tempatkan content di sekitar parent account
              const contentAngle = Math.random() * 2 * Math.PI
              const contentRadius = 40 + Math.random() * 20
              const x = parentPos.x + Math.cos(contentAngle) * contentRadius
              const y = parentPos.y + Math.sin(contentAngle) * contentRadius
              
              nodePositions.current.set(node.id, { x, y, vx: 0, vy: 0 })
            } else {
              // Fallback positioning
              const x = rect.width * 0.5 + (Math.random() - 0.5) * 200
              const y = rect.height * 0.5 + (Math.random() - 0.5) * 200
              nodePositions.current.set(node.id, { x, y, vx: 0, vy: 0 })
            }
          } else {
            // Random positioning untuk content tanpa parent yang jelas
            const x = rect.width * 0.5 + (Math.random() - 0.5) * 200
            const y = rect.height * 0.5 + (Math.random() - 0.5) * 200
            nodePositions.current.set(node.id, { x, y, vx: 0, vy: 0 })
          }
        }
      }
    })

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      // Apply transformations
      ctx.save()
      ctx.translate(pan.x, pan.y)
      ctx.scale(zoom, zoom)

      // Draw grid background
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)'
      ctx.lineWidth = 1
      for (let x = 0; x < rect.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, rect.height)
        ctx.stroke()
      }
      for (let y = 0; y < rect.height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(rect.width, y)
        ctx.stroke()
      }

      // Draw edges
      edges.forEach(edge => {
        const srcPos = nodePositions.current.get(edge.src)
        const dstPos = nodePositions.current.get(edge.dst)
        
        if (srcPos && dstPos) {
          ctx.beginPath()
          ctx.moveTo(srcPos.x, srcPos.y)
          ctx.lineTo(dstPos.x, dstPos.y)
          
          // Edge styling based on type
          if (edge.type === "posted") {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)'
            ctx.lineWidth = 3
          } else {
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)'
            ctx.lineWidth = 2
            ctx.setLineDash([5, 5])
          }
          
          ctx.stroke()
          ctx.setLineDash([])
          
          // Draw arrow
          const angle = Math.atan2(dstPos.y - srcPos.y, dstPos.x - srcPos.x)
          const arrowLength = 10
          ctx.beginPath()
          ctx.moveTo(dstPos.x, dstPos.y)
          ctx.lineTo(
            dstPos.x - arrowLength * Math.cos(angle - Math.PI / 6),
            dstPos.y - arrowLength * Math.sin(angle - Math.PI / 6)
          )
          ctx.moveTo(dstPos.x, dstPos.y)
          ctx.lineTo(
            dstPos.x - arrowLength * Math.cos(angle + Math.PI / 6),
            dstPos.y - arrowLength * Math.sin(angle + Math.PI / 6)
          )
          ctx.stroke()
        }
      })

      // Draw nodes
      filteredNodes.forEach(node => {
        const pos = nodePositions.current.get(node.id)
        if (!pos) return

        const isHovered = hoveredNode === node.id
        const isSelected = selectedNode === node.id
        
        if (node.type === "account") {
          const community = communities.find(c => c.id === node.community)
          // Ukuran berdasarkan centrality dan followers
          const baseRadius = 20 + (node.centrality * 25) + (node.followers / 10000)
          const radius = isHovered ? baseRadius + 8 : (isSelected ? baseRadius + 5 : baseRadius)
          
          // Node shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
          ctx.shadowBlur = isHovered ? 15 : 10
          ctx.shadowOffsetY = 2
          
          // Main circle
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
          
          // Gradient
          const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius)
          gradient.addColorStop(0, community?.color || '#64748b')
          gradient.addColorStop(1, community?.color ? community.color + '80' : '#64748b80')
          ctx.fillStyle = gradient
          ctx.fill()

          // Border
          ctx.strokeStyle = isSelected ? '#1e40af' : (isHovered ? '#ffffff' : community?.color || '#64748b')
          ctx.lineWidth = isSelected ? 4 : (isHovered ? 3 : 2)
          ctx.stroke()
          
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0

          // Username
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 10px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(node.username.substring(0, 8), pos.x, pos.y + 3)

          // Followers count
          ctx.fillStyle = '#1e40af'
          ctx.font = 'bold 8px sans-serif'
          ctx.fillText(`${(node.followers / 1000).toFixed(0)}K`, pos.x, pos.y + 45)

          // Centrality score
          if (node.centrality) {
            ctx.beginPath()
            ctx.arc(pos.x - 25, pos.y - 25, 12, 0, 2 * Math.PI)
            ctx.fillStyle = '#1e40af'
            ctx.fill()
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 8px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(node.centrality.toFixed(2), pos.x - 25, pos.y - 21)
          }

        } else if (node.type === "content") {
          const size = isHovered ? 18 : (isSelected ? 16 : 14)
          
          // Content node (square)
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
          ctx.shadowBlur = 5
          ctx.shadowOffsetY = 1
          
          ctx.fillStyle = isHovered ? '#f1f5f9' : '#e2e8f0'
          ctx.fillRect(pos.x - size/2, pos.y - size/2, size, size)
          
          ctx.strokeStyle = isSelected ? '#1e40af' : (isHovered ? '#64748b' : '#94a3b8')
          ctx.lineWidth = isSelected ? 3 : 2
          ctx.strokeRect(pos.x - size/2, pos.y - size/2, size, size)
          
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0

          // Content icon
          ctx.fillStyle = '#64748b'
          ctx.fillRect(pos.x - 4, pos.y - 4, 8, 8)

          // Watermark count
          if (node.watermarks) {
            ctx.beginPath()
            ctx.arc(pos.x + 12, pos.y - 12, 8, 0, 2 * Math.PI)
            ctx.fillStyle = '#dc2626'
            ctx.fill()
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 8px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(node.watermarks.toString(), pos.x + 12, pos.y - 8)
          }
        }
      })

      ctx.restore()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Mouse interaction dengan zoom dan pan
    const getTransformedMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left - pan.x) / zoom
      const y = (e.clientY - rect.top - pan.y) / zoom
      return { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const rect = canvas.getBoundingClientRect()
        const currentX = e.clientX - rect.left
        const currentY = e.clientY - rect.top
        
        setPan(prev => ({
          x: prev.x + (currentX - lastMousePos.x),
          y: prev.y + (currentY - lastMousePos.y)
        }))
        
        setLastMousePos({ x: currentX, y: currentY })
        return
      }

      const { x, y } = getTransformedMousePos(e)

      let found = false
      filteredNodes.forEach(node => {
        const pos = nodePositions.current.get(node.id)
        if (!pos) return

        const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2)
        const radius = node.type === "account" 
          ? 20 + (node.centrality * 25) + (node.followers / 10000)
          : 14

        if (distance < radius) {
          setHoveredNode(node.id)
          canvas.style.cursor = 'pointer'
          found = true
        }
      })

      if (!found) {
        setHoveredNode(null)
        canvas.style.cursor = isDragging ? 'grabbing' : 'default'
      }
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const { x: transformedX, y: transformedY } = getTransformedMousePos(e)

      filteredNodes.forEach(node => {
        const pos = nodePositions.current.get(node.id)
        if (!pos) return

        const distance = Math.sqrt((transformedX - pos.x) ** 2 + (transformedY - pos.y) ** 2)
        const radius = node.type === "account" 
          ? 20 + (node.centrality * 25) + (node.followers / 10000)
          : 14

        if (distance < radius) {
          setSelectedNode(selectedNode === node.id ? null : node.id)
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
    }
  }, [nodes, edges, communities, selectedCommunity, hoveredNode, selectedNode])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Info overlay */}
      {(hoveredNode || selectedNode) && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-300 max-w-xs">
          {(() => {
            const nodeId = selectedNode || hoveredNode
            const node = nodes.find(n => n.id === nodeId)
            if (!node) return null

            return (
              <div>
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${node.type === 'account' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {node.type === 'account' ? `@${node.username}` : 'Content'}
                  </h3>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  {node.type === 'account' ? (
                    <>
                      <p>Platform: {node.platform}</p>
                      <p>Followers: {node.followers?.toLocaleString()}</p>
                      <p>Centrality: {node.centrality}</p>
                      <p>Community: {communities.find(c => c.id === node.community)?.name}</p>
                    </>
                  ) : (
                    <>
                      <p>Platform: {node.platform}</p>
                      <p>Watermarks: {node.watermarks}</p>
                      <p>OCR: {node.ocrText}</p>
                    </>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Legend */}
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

      {/* Community Colors */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
        <div className="text-xs font-medium text-gray-700 mb-2">Communities</div>
        <div className="space-y-1">
          {communities.map(community => (
            <div key={community.id} className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: community.color }}></div>
              <span className="font-medium">{community.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NetworkPage() {
  const [selectedCommunity, setSelectedCommunity] = useState("all")

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
                <SelectItem value="all">Semua Komunitas ({networkData.nodes.filter(n => n.type === "account").length} akun)</SelectItem>
                {communities.map((comm) => (
                  <SelectItem key={comm.id} value={comm.id}>
                    {comm.name} ({comm.size} akun) - {comm.activity}
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
                        {/* Main Graph Visualization dengan Canvas */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Interactive Network Graph</CardTitle>
                <CardDescription>
                  Graf bipartit menampilkan hubungan akun-konten dengan community detection menggunakan Canvas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border-2 border-slate-200 relative overflow-hidden">
                  <NetworkCanvas 
                    nodes={networkData.nodes}
                    edges={networkData.edges}
                    communities={communities}
                    selectedCommunity={selectedCommunity}
                  />
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
