"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Download, FileText, Lock, Search, Calendar, Hash, CheckCircle, Database, Eye } from "lucide-react"

// Data dummy untuk evidence vault
const evidenceData = [
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
      txHash: "0xabcdef123456789abcdef123456789abcdef123456789abcdef123456789abcdef",
      blockNumber: 1234567,
      timestamp: "2025-01-09 14:35:22",
    },
    integrity: "verified",
    platform: "Instagram",
    reporter: "Masyarakat Umum",
    priority: "high",
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
      txHash: "0x987654321abcdef987654321abcdef987654321abcdef987654321abcdef987654",
      blockNumber: 1234566,
      timestamp: "2025-01-09 13:20:11",
    },
    integrity: "verified",
    platform: "TikTok",
    reporter: "Aparat Penegak Hukum",
    priority: "critical",
  },
  {
    id: "JJ-2025-001232",
    title: "Casino Live YouTube",
    status: "completed",
    createdAt: "2025-01-09 12:45",
    evidence: {
      images: 22,
      videos: 1,
      accounts: 3,
      watermarks: 8,
    },
    blockchain: {
      txHash: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef123456",
      blockNumber: 1234565,
      timestamp: "2025-01-09 12:50:33",
    },
    integrity: "verified",
    platform: "YouTube",
    reporter: "Analis Digital",
    priority: "medium",
  },
]

const chainOfCustody = [
  {
    timestamp: "2025-01-09 14:30:15",
    action: "INGESTION_COMPLETED",
    actor: "cloudrun:content-fetcher@v1.3.0",
    artifact: "media.mp4",
    hash: "1f3a2b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e",
    txHash: "0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
    description: "Video content downloaded and validated from Instagram post",
  },
  {
    timestamp: "2025-01-09 14:31:02",
    action: "FRAMES_EXTRACTED",
    actor: "cloudrun:frame-extractor@v1.2.1",
    artifact: "428 frames",
    hash: "2e4b6c8d0f2g4h6i8j0k2l4m6n8o0p2q4r6s8t0u2v4w6x8y0z2a4b6c8d0e2f4g",
    txHash: "0xdef456ghi789jkl012mno345pqr678stu901vwx234yz567abc123",
    description: "Video frames extracted at 2 fps using FFmpeg",
  },
  {
    timestamp: "2025-01-09 14:33:45",
    action: "DETECTION_COMPLETED",
    actor: "vertex-ai:resnet50@v0.9.2",
    artifact: "detection results",
    hash: "3c5d7e9f1g3h5i7j9k1l3m5n7o9p1q3r5s7t9u1v3w5x7y9z1a3b5c7d9e1f3g5h",
    txHash: "0x789abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
    description: "ResNet-50 watermark detection completed with 94.2% confidence",
  },
  {
    timestamp: "2025-01-09 14:34:12",
    action: "OCR_COMPLETED",
    actor: "cloudrun:tesseract-ocr@v5.3.0",
    artifact: "extracted text",
    hash: "4d6f8g0h2i4j6k8l0m2n4o6p8q0r2s4t6u8v0w2x4y6z8a0b2c4d6e8f0g2h4i6j",
    txHash: "0x012mno345pqr678stu901vwx234yz567abc123def456ghi789jkl",
    description: "OCR text extraction: 'SLOT88 BONUS NEW MEMBER www.xx-judol.xyz'",
  },
  {
    timestamp: "2025-01-09 14:35:22",
    action: "EVIDENCE_SEALED",
    actor: "blockchain:hyperledger-fabric@v2.4.0",
    artifact: "complete evidence package",
    hash: "5e7g9h1i3j5k7l9m1n3o5p7q9r1s3t5u7v9w1x3y5z7a9b1c3d5e7f9g1h3i5j7k",
    txHash: "0x345pqr678stu901vwx234yz567abc123def456ghi789jkl012mno",
    description: "Evidence package sealed and recorded in blockchain",
  },
]

export default function EvidencePage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvidence = evidenceData.filter(
    (evidence) =>
      evidence.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Evidence Vault</h1>
          <p className="text-slate-600">
            Manajemen bukti digital dengan chain of custody berbasis blockchain sesuai standar ISO/IEC 27043
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="caseId">Case ID atau Title</Label>
              <Input
                id="caseId"
                placeholder="JJ-2025-001234 atau Jaringan Slot Online..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="dateRange">Rentang Tanggal</Label>
              <Input id="dateRange" type="date" />
            </div>
            <div className="flex items-end">
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cases">Evidence Cases</TabsTrigger>
          <TabsTrigger value="custody">Chain of Custody</TabsTrigger>
          <TabsTrigger value="integrity">Integrity Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredEvidence.map((evidence) => (
              <Card key={evidence.id} className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{evidence.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span>ID: {evidence.id}</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {evidence.createdAt}
                        </span>
                        <Badge variant="outline">{evidence.platform}</Badge>
                        <Badge variant="outline">{evidence.reporter}</Badge>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          evidence.priority === "critical"
                            ? "destructive"
                            : evidence.priority === "high"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {evidence.priority.toUpperCase()}
                      </Badge>
                      <Badge variant={evidence.status === "completed" ? "default" : "secondary"}>
                        {evidence.status === "completed" ? "Completed" : "Processing"}
                      </Badge>
                      <Badge variant={evidence.integrity === "verified" ? "default" : "destructive"}>
                        <Shield className="h-3 w-3 mr-1" />
                        {evidence.integrity === "verified" ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Evidence Summary */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{evidence.evidence.images}</div>
                      <p className="text-sm text-gray-600">Images</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{evidence.evidence.videos}</div>
                      <p className="text-sm text-gray-600">Videos</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{evidence.evidence.accounts}</div>
                      <p className="text-sm text-gray-600">Accounts</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{evidence.evidence.watermarks}</div>
                      <p className="text-sm text-gray-600">Watermarks</p>
                    </div>
                  </div>

                  {/* Blockchain Info */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-3">
                      <Lock className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Blockchain Record</span>
                      <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-blue-600 font-medium">Transaction Hash</p>
                        <p className="font-mono text-blue-800 text-xs break-all">
                          {evidence.blockchain.txHash.substring(0, 20)}...
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-600 font-medium">Block Number</p>
                        <p className="font-mono text-blue-800">#{evidence.blockchain.blockNumber}</p>
                      </div>
                      <div>
                        <p className="text-blue-600 font-medium">Sealed At</p>
                        <p className="font-mono text-blue-800 text-xs">{evidence.blockchain.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedCase(evidence.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Evidence
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Hash className="h-4 w-4 mr-2" />
                      Verify Hash
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
              <CardDescription>
                Jejak audit lengkap untuk semua artefak digital dalam kasus ini sesuai standar ISO/IEC 27043
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chainOfCustody.map((entry, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{entry.action.replace(/_/g, " ")}</h4>
                        <Badge variant="outline">{entry.timestamp}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Actor:</strong> {entry.actor}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Artifact:</strong> {entry.artifact}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                          <p className="mb-1">
                            <strong>SHA3-256:</strong>
                            <br />
                            <span className="break-all">{entry.hash}</span>
                          </p>
                          <p>
                            <strong>TX Hash:</strong>
                            <br />
                            <span className="break-all">{entry.txHash}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hash Verification</CardTitle>
                <CardDescription>Verifikasi integritas bukti digital menggunakan SHA-3</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-800">media.mp4</p>
                      <p className="text-sm text-green-600">Original evidence file</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-800">detection_results.json</p>
                      <p className="text-sm text-green-600">AI detection output</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-800">ocr_results.txt</p>
                      <p className="text-sm text-green-600">OCR extracted text</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <Button className="w-full">
                  <Hash className="h-4 w-4 mr-2" />
                  Verify All Hashes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Status kepatuhan terhadap standar forensik digital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">ISO/IEC 27043</p>
                        <p className="text-sm text-green-600">Digital Forensic Standards</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Chain of Custody</p>
                        <p className="text-sm text-green-600">Blockchain Verified</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Data Encryption</p>
                        <p className="text-sm text-green-600">KMS Protected</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Court Admissible</p>
                        <p className="text-sm text-green-600">Legal Standards Met</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
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
