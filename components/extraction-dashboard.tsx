"use client";

import { AlertTriangle, CheckCircle2, AlertCircle, TrendingUp, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ExtractionDashboardProps {
  data: any;
}

export default function ExtractionDashboard({ data }: ExtractionDashboardProps) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Key Terms Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Borrower</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-white">{data.borrower}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Loan Amount</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-white">{data.loanAmount}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Interest Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-white">{data.interestRate}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Maturity Date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-white">{data.maturity}</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Risk Assessment</CardTitle>
              <CardDescription className="text-slate-400">
                AI-powered analysis of potential risks and compliance issues
              </CardDescription>
            </div>
            <Shield className="h-8 w-8 text-amber-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.risks.map((risk: any, index: number) => (
            <Alert
              key={index}
              className={`
                ${risk.severity === 'high' ? 'border-red-500/50 bg-red-500/10' : ''}
                ${risk.severity === 'medium' ? 'border-amber-500/50 bg-amber-500/10' : ''}
                ${risk.severity === 'low' ? 'border-blue-500/50 bg-blue-500/10' : ''}
              `}
            >
              {risk.severity === 'high' && <AlertTriangle className="h-4 w-4 text-red-400" />}
              {risk.severity === 'medium' && <AlertCircle className="h-4 w-4 text-amber-400" />}
              {risk.severity === 'low' && <CheckCircle2 className="h-4 w-4 text-blue-400" />}
              <AlertTitle className="text-white capitalize">{risk.severity} Risk</AlertTitle>
              <AlertDescription className="text-slate-300">
                {risk.finding}
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Covenant Analysis */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Covenant Analysis</CardTitle>
          <CardDescription className="text-slate-400">
            Comparison against market benchmarks and LMA standards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.covenants.map((covenant: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-white">{covenant.name}</p>
                  <Badge
                    variant="outline"
                    className={`
                      ${covenant.status === 'high-risk' ? 'border-red-400 text-red-400' : ''}
                      ${covenant.status === 'medium-risk' ? 'border-amber-400 text-amber-400' : ''}
                      ${covenant.status === 'low-risk' ? 'border-green-400 text-green-400' : ''}
                    `}
                  >
                    {covenant.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xl font-bold text-white">{covenant.value}</p>
              </div>
              <p className="text-sm text-slate-400">{covenant.benchmark}</p>
              <Separator className="bg-slate-800" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              LMA Standard Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{data.compliance.lmaStandard}%</span>
              <Badge variant="outline" className="border-amber-400 text-amber-400">
                NEEDS REVIEW
              </Badge>
            </div>
            <Progress value={data.compliance.lmaStandard} className="h-2" />
            <p className="text-sm text-slate-400">
              Document deviates from LMA standard form in 3 key sections
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Regulatory Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{data.compliance.regulatoryCompliance}%</span>
              <Badge variant="outline" className="border-green-400 text-green-400">
                COMPLIANT
              </Badge>
            </div>
            <Progress value={data.compliance.regulatoryCompliance} className="h-2" />
            <p className="text-sm text-slate-400">
              Meets Basel III and EU banking regulations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center transition-colors">
              <FileText className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">Export to Excel</p>
            </button>
            <button className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center transition-colors">
              <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">Compare to Portfolio</p>
            </button>
            <button className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center transition-colors">
              <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">Generate Report</p>
            </button>
            <button className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center transition-colors">
              <CheckCircle2 className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">Share with Team</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
