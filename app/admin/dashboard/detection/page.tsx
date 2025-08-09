"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  ImageIcon,
  Video,
  FileText,
  Zap,
  Target,
} from "lucide-react"

export default function DetectionPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const detectionResults = [
    {
      id: "frame_000123.jpg",
      caseId: "JJ-2025-001234",
      platform: "Instagram",
      type: "image",
      confidence: 94.2,
      boxes: 3,
      ocrText: "SLOT88 BONUS NEW MEMBER\nwww.xx-judol.xyz\nWA: 0812345678",
      timestamp: "2025-01-09 14:30:15",
      status: "verified",
      heatmapUrl: "/api/heatmaps/frame_000123.png",
      originalUrl: "/api/frames/frame_000123.jpg",
    },
    {
      id: "frame_000456.jpg",
      caseId: "JJ-2025-001233",
      platform: "TikTok",
      type: "video_frame",
      confidence: 87.5,
      boxes: 2,
      ocrText: "GACOR MAXWIN HARI INI\nDEPOSIT 10RB BONUS 50RB",
      timestamp: "2025-01-09 14:25:32",
      status: "processing",
      heatmapUrl: "/api/heatmaps/frame_000456.png",
      originalUrl: "/api/frames/frame_000456.jpg",
    },
    {
      id: "img_001789.jpg",
      caseId: "JJ-2025-001232",
      platform: "YouTube",
      type: "thumbnail",
      confidence: 91.8,
      boxes: 1,
      ocrText: "TOGEL HONGKONG PREDIKSI JITU\nAKURASI 99%",
      timestamp: "2025-01-09 14:20:45",
      status: "verified",
      heatmapUrl: "/api/heatmaps/img_001789.png",
      originalUrl: "/api/images/img_001789.jpg",
    },
    {
      id: "frame_000789.jpg",
      caseId: "JJ-2025-001231",
      platform: "Instagram",
      type: "story",
      confidence: 89.3,
      boxes: 4,
      ocrText: "LIVE CASINO DEALER CANTIK\nMIN DEPOSIT 25K\nBONUS WELCOME 100%",
      timestamp: "2025-01-09 14:15:22",
      status: "flagged",
      heatmapUrl: "/api/heatmaps/frame_000789.png",
      originalUrl: "/api/frames/frame_000789.jpg",
    },
  ]

  const modelMetrics = [
    {
      name: "ResNet-50 Watermark Detector",
      version: "v0.9.2",
      accuracy: 94.2,
      precision: 92.8,
      recall: 95.1,
      f1Score: 93.9,
      totalInferences: 15847,
      avgInferenceTime: "1.2s",
    },
    {
      name: "Tesseract OCR Engine",
      version: "v5.3.0",
      accuracy: 87.5,
      precision: 89.2,
      recall: 85.8,
      f1Score: 87.5,
      totalInferences: 8934,
      avgInferenceTime: "0.8s",
    },
  ]

  const pipelineConfig = {
    patchSize: 256,
    stride: 128,
    threshold: 0.8,
    batchSize: 32,
    preprocessing: {
      clahe: { clipLimit: 2.0, tileGrid: [8, 8] },
      bilateral: { d: 5, sigmaColor: 50, sigmaSpace: 50 },
      unsharp: { sigma: 1.0, amount: 1.5 },
    },
  }

  const filteredResults = detectionResults.filter((result) => {
    const matchesSearch =
      result.ocrText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.caseId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || result.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Detection Engine</h1>
          <p className="text-slate-600">ResNet-50 Watermark Detection + Tesseract OCR Analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="results">Detection Results</TabsTrigger>
          <TabsTrigger value="models">Model Performance</TabsTrigger>
          <TabsTrigger value="config">Pipeline Config</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by case ID, OCR text, or platform..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Detection Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResults.map((result) => (
              <Card key={result.id} className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        {result.type === "image" && <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />}
                        {result.type === "video_frame" && <Video className="h-5 w-5 mr-2 text-purple-600" />}
                        {result.type === "thumbnail" && <FileText className="h-5 w-5 mr-2 text-green-600" />}
                        {result.type === "story" && <Zap className="h-5 w-5 mr-2 text-orange-600" />}
                        {result.id}
                      </CardTitle>
                      <CardDescription>
                        Case: {result.caseId} • {result.platform} • {result.timestamp}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          result.confidence >= 90 ? "destructive" : result.confidence >= 80 ? "default" : "secondary"
                        }
                      >
                        {result.confidence}%
                      </Badge>
                      {result.status === "verified" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {result.status === "processing" && <Clock className="h-5 w-5 text-yellow-600" />}
                      {result.status === "flagged" && <AlertTriangle className="h-5 w-5 text-red-600" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Heatmap Visualization */}
                  <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center border-2 border-dashed border-red-300">
                    <div className="text-center">
                      <Target className="h-12 w-12 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-700 font-medium">Heatmap Visualization</p>
                      <p className="text-xs text-red-600">{result.boxes} detection boxes</p>
                    </div>
                  </div>

                  {/* OCR Results */}
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center mb-2">
                      <FileText className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-red-800">OCR Extracted Text:</span>
                    </div>
                    <p className="text-sm text-red-700 whitespace-pre-line font-mono bg-white p-2 rounded border">
                      {result.ocrText}
                    </p>
                  </div>

                  {/* Technical Details */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900">{result.confidence}%</p>
                      <p className="text-gray-600">Confidence</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900">{result.boxes}</p>
                      <p className="text-gray-600">Detections</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900">{result.platform}</p>
                      <p className="text-gray-600">Platform</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Evidence
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modelMetrics.map((model) => (
              <Card key={model.name}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    {model.name}
                  </CardTitle>
                  <CardDescription>Version {model.version}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{model.accuracy}%</div>
                      <p className="text-sm text-green-700">Accuracy</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{model.precision}%</div>
                      <p className="text-sm text-blue-700">Precision</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{model.recall}%</div>
                      <p className="text-sm text-purple-700">Recall</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{model.f1Score}%</div>
                      <p className="text-sm text-orange-700">F1-Score</p>
                    </div>
                  </div>

                  {/* Usage Statistics */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Inferences</span>
                      <span className="font-medium">{model.totalInferences.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Inference Time</span>
                      <span className="font-medium">{model.avgInferenceTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Pipeline Configuration</CardTitle>
                <CardDescription>Current settings for ResNet-50 detection engine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Patch Size</p>
                    <p className="font-medium">
                      {pipelineConfig.patchSize}×{pipelineConfig.patchSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stride</p>
                    <p className="font-medium">{pipelineConfig.stride}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Threshold</p>
                    <p className="font-medium">{pipelineConfig.threshold}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Batch Size</p>
                    <p className="font-medium">{pipelineConfig.batchSize}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OpenCV Preprocessing</CardTitle>
                <CardDescription>Image enhancement parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">CLAHE (Contrast Enhancement)</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Clip Limit: {pipelineConfig.preprocessing.clahe.clipLimit}</p>
                    <p>Tile Grid: {pipelineConfig.preprocessing.clahe.tileGrid.join("×")}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Bilateral Filter (Noise Reduction)</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Diameter: {pipelineConfig.preprocessing.bilateral.d}</p>
                    <p>Sigma Color: {pipelineConfig.preprocessing.bilateral.sigmaColor}</p>
                    <p>Sigma Space: {pipelineConfig.preprocessing.bilateral.sigmaSpace}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Unsharp Mask (Sharpening)</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Sigma: {pipelineConfig.preprocessing.unsharp.sigma}</p>
                    <p>Amount: {pipelineConfig.preprocessing.unsharp.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Trends</CardTitle>
                <CardDescription>7-day detection statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Today</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-16 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">89</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Yesterday</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-14 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">76</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">2 days ago</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-18 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">94</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Detections by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="text-sm">Instagram</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      <span className="text-sm">TikTok</span>
                    </div>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">YouTube</span>
                    </div>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confidence Distribution</CardTitle>
                <CardDescription>Detection confidence levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">90-100%</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">34</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">80-89%</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">28</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">70-79%</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">15</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">&lt; 70%</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">8</span>
                    </div>
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
