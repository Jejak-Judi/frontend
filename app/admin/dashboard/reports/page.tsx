"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Download, FileText, Calendar, Eye, BarChart3, Database } from "lucide-react"

// Data dummy untuk forensic reports
const forensicReports = [
  {
    id: "FR-2025-001",
    caseId: "JJ-2025-001234",
    title: "Forensic Analysis Report - Instagram Slot Network",
    type: "comprehensive",
    status: "completed",
    createdAt: "2025-01-09 15:30",
    pages: 47,
    evidence: {
      watermarks: 12,
      accounts: 8,
      connections: 23,
      platforms: ["Instagram", "TikTok"],
    },
    findings: {
      severity: "high",
      confidence: 94.2,
      networkSize: 8,
      keyActors: 3,
    },
    compliance: ["ISO/IEC 27043", "Court Admissible", "Chain of Custody"],
  },
  {
    id: "FR-2025-002",
    caseId: "JJ-2025-001233",
    title: "Network Analysis Report - TikTok Togel Campaign",
    type: "network_analysis",
    status: "draft",
    createdAt: "2025-01-09 14:15",
    pages: 23,
    evidence: {
      watermarks: 6,
      accounts: 5,
      connections: 12,
      platforms: ["TikTok", "YouTube"],
    },
    findings: {
      severity: "critical",
      confidence: 87.5,
      networkSize: 5,
      keyActors: 2,
    },
    compliance: ["ISO/IEC 27043", "Chain of Custody"],
  },
  {
    id: "FR-2025-003",
    caseId: "JJ-2025-001232",
    title: "Evidence Summary - YouTube Casino Live",
    type: "evidence_summary",
    status: "completed",
    createdAt: "2025-01-09 13:45",
    pages: 15,
    evidence: {
      watermarks: 8,
      accounts: 3,
      connections: 8,
      platforms: ["YouTube"],
    },
    findings: {
      severity: "medium",
      confidence: 91.8,
      networkSize: 3,
      keyActors: 1,
    },
    compliance: ["ISO/IEC 27043", "Court Admissible", "Chain of Custody"],
  },
]

const reportTemplates = [
  {
    id: "comprehensive",
    name: "Comprehensive Forensic Report",
    description: "Laporan forensik lengkap dengan semua bukti, analisis AI, dan visualisasi jaringan",
    sections: [
      "Executive Summary",
      "Case Overview",
      "Evidence Collection",
      "AI Detection Results",
      "Network Analysis",
      "Chain of Custody",
      "Legal Conclusions",
      "Appendices",
    ],
    estimatedPages: "40-60 pages",
    timeToGenerate: "5-8 minutes",
  },
  {
    id: "network_analysis",
    name: "Network Analysis Report",
    description: "Fokus pada analisis jaringan distribusi dan identifikasi aktor kunci",
    sections: [
      "Network Overview",
      "Community Detection",
      "Key Actors Analysis",
      "Distribution Patterns",
      "Recommendations",
    ],
    estimatedPages: "20-30 pages",
    timeToGenerate: "3-5 minutes",
  },
  {
    id: "evidence_summary",
    name: "Evidence Summary",
    description: "Ringkasan bukti digital dengan fokus pada watermark dan OCR results",
    sections: ["Case Summary", "Evidence Inventory", "Detection Results", "Hash Verification", "Compliance Status"],
    estimatedPages: "10-20 pages",
    timeToGenerate: "2-3 minutes",
  },
]

const monthlyStats = {
  totalReports: 47,
  completedReports: 42,
  draftReports: 5,
  averagePages: 28,
  totalCases: 156,
  highSeverity: 23,
  mediumSeverity: 89,
  lowSeverity: 44,
}

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedCase, setSelectedCase] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    // In real app, would redirect to generated report or show success message
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Forensic Reports</h1>
          <p className="text-slate-600">Generate dan kelola laporan forensik digital sesuai standar ISO/IEC 27043</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="generator">Report Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {forensicReports.map((report) => (
              <Card key={report.id} className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{report.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span>ID: {report.id}</span>
                        <span>Case: {report.caseId}</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {report.createdAt}
                        </span>
                        <span>{report.pages} pages</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          report.findings.severity === "critical"
                            ? "destructive"
                            : report.findings.severity === "high"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {report.findings.severity.toUpperCase()}
                      </Badge>
                      <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                        {report.status === "completed" ? "Completed" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Report Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{report.evidence.watermarks}</div>
                      <p className="text-sm text-gray-600">Watermarks</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{report.evidence.accounts}</div>
                      <p className="text-sm text-gray-600">Accounts</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{report.evidence.connections}</div>
                      <p className="text-sm text-gray-600">Connections</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{report.findings.confidence}%</div>
                      <p className="text-sm text-gray-600">Confidence</p>
                    </div>
                  </div>

                  {/* Findings Summary */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Key Findings</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-blue-600">Network Size</p>
                        <p className="font-medium text-blue-800">{report.findings.networkSize} accounts</p>
                      </div>
                      <div>
                        <p className="text-blue-600">Key Actors</p>
                        <p className="font-medium text-blue-800">{report.findings.keyActors} identified</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-blue-600 text-sm">Platforms:</p>
                      <div className="flex space-x-2 mt-1">
                        {report.evidence.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Compliance Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.compliance.map((item) => (
                        <Badge key={item} variant="outline" className="text-green-700 border-green-300">
                          <Shield className="h-3 w-3 mr-1" />
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Edit Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Forensic Report</CardTitle>
              <CardDescription>
                Buat laporan forensik digital baru berdasarkan kasus yang telah dianalisis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Case</label>
                    <Select value={selectedCase} onValueChange={setSelectedCase}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kasus untuk dianalisis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JJ-2025-001234">JJ-2025-001234 - Instagram Slot Network</SelectItem>
                        <SelectItem value="JJ-2025-001233">JJ-2025-001233 - TikTok Togel Campaign</SelectItem>
                        <SelectItem value="JJ-2025-001232">JJ-2025-001232 - YouTube Casino Live</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Report Template</label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih template laporan" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedTemplate && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        {reportTemplates.find((t) => t.id === selectedTemplate)?.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {reportTemplates.find((t) => t.id === selectedTemplate)?.description}
                      </p>
                      <div className="text-sm">
                        <p>
                          <strong>Estimated:</strong>{" "}
                          {reportTemplates.find((t) => t.id === selectedTemplate)?.estimatedPages}
                        </p>
                        <p>
                          <strong>Generation Time:</strong>{" "}
                          {reportTemplates.find((t) => t.id === selectedTemplate)?.timeToGenerate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {selectedTemplate && selectedCase && (
                <div className="border-t pt-6">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Report Sections</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {reportTemplates
                        .find((t) => t.id === selectedTemplate)
                        ?.sections.map((section) => (
                          <div key={section} className="flex items-center text-sm text-blue-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            {section}
                          </div>
                        ))}
                    </div>
                  </div>

                  <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full">
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Forensic Report
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="border-2 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <p className="text-gray-600 mb-1">
                      <strong>Pages:</strong> {template.estimatedPages}
                    </p>
                    <p className="text-gray-600">
                      <strong>Generation:</strong> {template.timeToGenerate}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Sections Included:</p>
                    <div className="space-y-1">
                      {template.sections.slice(0, 4).map((section) => (
                        <div key={section} className="flex items-center text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {section}
                        </div>
                      ))}
                      {template.sections.length > 4 && (
                        <p className="text-xs text-gray-500">+{template.sections.length - 4} more sections</p>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.totalReports}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.completedReports}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((monthlyStats.completedReports / monthlyStats.totalReports) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Pages</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.averagePages}</div>
                <p className="text-xs text-muted-foreground">Per report</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cases Analyzed</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.totalCases}</div>
                <p className="text-xs text-muted-foreground">Total cases</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
                <CardDescription>Distribusi tingkat keparahan kasus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">High Severity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-red-500 rounded-full"
                          style={{ width: `${(monthlyStats.highSeverity / monthlyStats.totalCases) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{monthlyStats.highSeverity}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Medium Severity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-500 rounded-full"
                          style={{ width: `${(monthlyStats.mediumSeverity / monthlyStats.totalCases) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{monthlyStats.mediumSeverity}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Low Severity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${(monthlyStats.lowSeverity / monthlyStats.totalCases) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{monthlyStats.lowSeverity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Generation Trends</CardTitle>
                <CardDescription>Tren pembuatan laporan 7 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: "Today", reports: 8, completed: 6 },
                    { day: "Yesterday", reports: 12, completed: 11 },
                    { day: "2 days ago", reports: 6, completed: 6 },
                    { day: "3 days ago", reports: 9, completed: 8 },
                    { day: "4 days ago", reports: 15, completed: 13 },
                    { day: "5 days ago", reports: 7, completed: 7 },
                    { day: "6 days ago", reports: 11, completed: 10 },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between items-center">
                      <span className="text-sm">{item.day}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${(item.reports / 15) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.reports}</span>
                        </div>
                        <span className="text-xs text-gray-500">({item.completed} completed)</span>
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
