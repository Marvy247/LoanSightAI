"use client";

import { DollarSign, Clock, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ROICalculatorProps {
  showDetailedAnalysis?: boolean;
}

export default function ROICalculator({ showDetailedAnalysis = false }: ROICalculatorProps) {
  const oldWay = {
    lawyers: 2,
    hours: 8,
    rate: 500,
    total: 8000,
    time: "2 days"
  };

  const newWay = {
    apiCost: 0.10,
    time: "30 seconds",
    savings: 7999.90
  };

  const annualImpact = {
    dealsPerYear: 120,
    savingsPerDeal: newWay.savings,
    totalSavings: 120 * newWay.savings,
    timeSaved: "1,920 hours",
    productivityGain: "82%"
  };

  if (!showDetailedAnalysis) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Return on Investment</CardTitle>
              <CardDescription className="text-slate-400">
                See the immediate impact on your operations
              </CardDescription>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old Way */}
            <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20">
              <Badge variant="outline" className="border-red-400 text-red-400 mb-4">
                TRADITIONAL METHOD
              </Badge>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Lawyers</span>
                  <span className="text-white font-medium">{oldWay.lawyers} × {oldWay.hours} hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Rate</span>
                  <span className="text-white font-medium">${oldWay.rate}/hour</span>
                </div>
                <Separator className="bg-slate-800" />
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Cost</span>
                  <span className="text-2xl font-bold text-red-400">${oldWay.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Time Required</span>
                  <span className="text-white font-medium">{oldWay.time}</span>
                </div>
              </div>
            </div>

            {/* New Way */}
            <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20">
              <Badge variant="outline" className="border-green-400 text-green-400 mb-4">
                WITH LOANSIGHT AI
              </Badge>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Processing</span>
                  <span className="text-white font-medium">Automated AI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">API Cost</span>
                  <span className="text-white font-medium">${newWay.apiCost}</span>
                </div>
                <Separator className="bg-slate-800" />
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Cost</span>
                  <span className="text-2xl font-bold text-green-400">${newWay.apiCost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Time Required</span>
                  <span className="text-white font-medium">{newWay.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="mt-6 p-6 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
            <p className="text-slate-400 mb-2">Savings Per Document</p>
            <p className="text-4xl font-bold text-white mb-1">
              ${newWay.savings.toLocaleString()}
            </p>
            <p className="text-green-400 font-medium">99.99% cost reduction</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Detailed Analysis View
  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Annual ROI Impact</CardTitle>
          <CardDescription className="text-slate-400">
            Based on typical bank processing 120 loan documents per year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                <p className="text-slate-400 text-sm">Total Savings</p>
              </div>
              <p className="text-3xl font-bold text-white">
                ${(annualImpact.totalSavings / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-slate-500 mt-1">Per year</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <p className="text-slate-400 text-sm">Time Saved</p>
              </div>
              <p className="text-3xl font-bold text-white">{annualImpact.timeSaved}</p>
              <p className="text-xs text-slate-500 mt-1">Per year</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <p className="text-slate-400 text-sm">Productivity Gain</p>
              </div>
              <p className="text-3xl font-bold text-white">{annualImpact.productivityGain}</p>
              <p className="text-xs text-slate-500 mt-1">Faster processing</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-amber-400" />
                <p className="text-slate-400 text-sm">Documents</p>
              </div>
              <p className="text-3xl font-bold text-white">{annualImpact.dealsPerYear}</p>
              <p className="text-xs text-slate-500 mt-1">Per year</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Impact */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Business Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-slate-400 mb-2">Faster Deal Closings</p>
              <p className="text-2xl font-bold text-white mb-1">2 days → 2 hours</p>
              <p className="text-sm text-blue-400">Close deals 12x faster</p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-slate-400 mb-2">Risk Detection</p>
              <p className="text-2xl font-bold text-white mb-1">3.2x more</p>
              <p className="text-sm text-green-400">Risks identified vs manual</p>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <p className="text-sm text-slate-400 mb-2">Accuracy Rate</p>
              <p className="text-2xl font-bold text-white mb-1">99.8%</p>
              <p className="text-sm text-purple-400">Zero missed covenants</p>
            </div>
          </div>

          <Separator className="bg-slate-800" />

          <div className="space-y-3">
            <h4 className="font-medium text-white">Key Benefits</h4>
            <ul className="space-y-2">
              {[
                "Scale document review without hiring additional staff",
                "Standardize analysis across all loan documents",
                "Reduce human error in covenant tracking",
                "Enable lawyers to focus on strategic work, not data extraction",
                "Build institutional knowledge base from document patterns"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Market Opportunity */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-400">Addressable Market</p>
            <p className="text-5xl font-bold text-white">$4.7T</p>
            <p className="text-slate-300">Global syndicated loan market</p>
            <p className="text-sm text-slate-400 mt-4">
              5,000+ financial institutions • 50,000+ loans annually • 200M+ pages analyzed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
