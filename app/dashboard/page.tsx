"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, TrendingUp, AlertTriangle, CheckCircle2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "react-hot-toast";
import AnimatedStats from "@/components/animated-stats";
import EnhancedUpload from "@/components/enhanced-upload";
import ProcessingAnimation from "@/components/processing-animation";
import PremiumExtractionDashboard from "@/components/premium-extraction-dashboard";
import QAInterface from "@/components/qa-interface";
import ROICalculator from "@/components/roi-calculator";

export default function Dashboard() {
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleUpload = async (file: File) => {
    setProcessing(true);
    setProgress(0);

    // Simulate processing with realistic stages
    const stages = [
      { progress: 20, text: "Parsing document..." },
      { progress: 40, text: "Extracting key terms..." },
      { progress: 60, text: "Analyzing covenants..." },
      { progress: 80, text: "Calculating risk scores..." },
      { progress: 100, text: "Complete!" }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(stage.progress);
    }

    // Mock extracted data
    const mockData = {
      borrower: "Apex Manufacturing Ltd.",
      loanAmount: "$500,000,000",
      interestRate: "SOFR + 325 bps",
      maturity: "December 15, 2029",
      leverage: "5.5x EBITDA",
      covenants: [
        { name: "Leverage Ratio", value: "5.5x", status: "high-risk", benchmark: "4.0x market avg" },
        { name: "Interest Coverage", value: "3.0x", status: "medium-risk", benchmark: "3.5x market avg" },
        { name: "Minimum Liquidity", value: "$25M", status: "low-risk", benchmark: "$20M market avg" }
      ],
      risks: [
        { severity: "high", finding: "Leverage covenant exceeds market standard by 37.5%" },
        { severity: "medium", finding: "Missing LMA standard guarantor provisions in Section 9" },
        { severity: "low", finding: "Prepayment terms favor borrower more than typical" }
      ],
      compliance: {
        lmaStandard: 78,
        regulatoryCompliance: 92
      }
    };

    setExtractedData(mockData);
    setProcessing(false);
    setUploaded(true);
  };

  if (!uploaded && !processing) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  LoanSight AI
                </h1>
                <p className="text-zinc-400">Intelligent Loan Document Analysis</p>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400 px-4 py-2 animate-pulse">
                🟢 LIVE DEMO
              </Badge>
            </motion.div>

            {/* Stats Overview */}
            <div className="mb-8">
              <AnimatedStats />
            </div>

            {/* Upload Area */}
            <EnhancedUpload onUpload={handleUpload} />

            {/* ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <ROICalculator />
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  if (processing) {
    return (
      <>
        <Toaster position="top-right" />
        <ProcessingAnimation progress={progress} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">Document Analysis</h1>
              <p className="text-zinc-400">Credit Agreement - {extractedData?.borrower}</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setUploaded(false)}
                className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white"
              >
                Upload New Document
              </Button>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-800 data-[state=active]:to-purple-900 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="qa"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-800 data-[state=active]:to-purple-900 data-[state=active]:text-white"
              >
                Ask Questions
              </TabsTrigger>
              <TabsTrigger
                value="roi"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-800 data-[state=active]:to-purple-900 data-[state=active]:text-white"
              >
                ROI Impact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <PremiumExtractionDashboard data={extractedData} />
            </TabsContent>

            <TabsContent value="qa">
              <QAInterface documentData={extractedData} />
            </TabsContent>

            <TabsContent value="roi">
              <ROICalculator showDetailedAnalysis />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
