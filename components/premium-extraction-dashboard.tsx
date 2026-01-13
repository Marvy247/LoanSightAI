"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, AlertCircle, TrendingUp, FileText, Shield, Download, Share2, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import RiskChart from "./risk-chart";

interface PremiumExtractionDashboardProps {
  data: any;
}

const covenantTrendData = [
  { month: "Jan", value: 4.2 },
  { month: "Feb", value: 4.5 },
  { month: "Mar", value: 4.8 },
  { month: "Apr", value: 5.1 },
  { month: "May", value: 5.3 },
  { month: "Jun", value: 5.5 }
];

const marketComparisonData = [
  { name: "Your Deal", value: 5.5, fill: "#ef4444" },
  { name: "Market Avg", value: 4.0, fill: "#10b981" },
  { name: "Peer Group", value: 4.3, fill: "#3b82f6" }
];

export default function PremiumExtractionDashboard({ data }: PremiumExtractionDashboardProps) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Key Terms Summary with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Borrower", value: data.borrower, gradient: "from-blue-500 to-cyan-500" },
            { label: "Loan Amount", value: data.loanAmount, gradient: "from-green-500 to-emerald-500" },
            { label: "Interest Rate", value: data.interestRate, gradient: "from-purple-500 to-pink-500" },
            { label: "Maturity Date", value: data.maturity, gradient: "from-amber-500 to-orange-500" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 hover:border-zinc-700 transition-all duration-300 group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <CardHeader className="pb-3">
                  <CardDescription className="text-zinc-400 text-xs uppercase tracking-wider">
                    {item.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-xl font-bold text-white break-words">{item.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Assessment - Takes 2 columns */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-400" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription className="text-zinc-400 mt-1">
                    AI-powered analysis of potential risks and compliance issues
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-amber-400 text-amber-400">
                  3 FINDINGS
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.risks.map((risk: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Alert
                    className={`
                      border transition-all duration-300 hover:scale-[1.02]
                      ${risk.severity === 'high' ? 'border-red-500/50 bg-red-500/5 hover:bg-red-500/10' : ''}
                      ${risk.severity === 'medium' ? 'border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/10' : ''}
                      ${risk.severity === 'low' ? 'border-blue-500/50 bg-blue-500/5 hover:bg-blue-500/10' : ''}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        risk.severity === 'high' ? 'bg-red-500/20' : 
                        risk.severity === 'medium' ? 'bg-amber-500/20' : 
                        'bg-blue-500/20'
                      }`}>
                        {risk.severity === 'high' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                        {risk.severity === 'medium' && <AlertCircle className="h-4 w-4 text-amber-400" />}
                        {risk.severity === 'low' && <CheckCircle2 className="h-4 w-4 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <AlertTitle className="text-white capitalize text-sm">
                          {risk.severity} Risk Detection
                        </AlertTitle>
                        <AlertDescription className="text-zinc-300 text-sm mt-1">
                          {risk.finding}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Distribution Chart */}
        <RiskChart />
      </div>

      {/* Covenant Analysis with Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Covenant Analysis</CardTitle>
                <CardDescription className="text-zinc-400 mt-1">
                  Comparison against market benchmarks and LMA standards
                </CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Covenant Details */}
              <div className="space-y-4">
                {data.covenants.map((covenant: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white text-sm">{covenant.name}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            covenant.status === 'high-risk' ? 'border-red-400 text-red-400' :
                            covenant.status === 'medium-risk' ? 'border-amber-400 text-amber-400' :
                            'border-green-400 text-green-400'
                          }`}
                        >
                          {covenant.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-white">{covenant.value}</p>
                    </div>
                    <p className="text-xs text-zinc-400">{covenant.benchmark}</p>
                    <div className="mt-3">
                      <Progress
                        value={covenant.status === 'high-risk' ? 90 : covenant.status === 'medium-risk' ? 60 : 30}
                        className="h-1.5"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Market Comparison Chart */}
              <div className="space-y-4">
                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-sm font-medium text-white mb-4">Leverage Ratio Comparison</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={marketComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="name" stroke="#71717a" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181b',
                          border: '1px solid #27272a',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-sm font-medium text-white mb-4">6-Month Leverage Trend</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={covenantTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181b',
                          border: '1px solid #27272a',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compliance Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 hover:border-amber-500/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-blue-400" />
                LMA Standard Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">{data.compliance.lmaStandard}%</span>
                <Badge variant="outline" className="border-amber-400 text-amber-400 px-3 py-1">
                  NEEDS REVIEW
                </Badge>
              </div>
              <Progress value={data.compliance.lmaStandard} className="h-2.5" />
              <p className="text-sm text-zinc-400">
                Document deviates from LMA standard form in <span className="text-amber-400 font-medium">3 key sections</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 hover:border-green-500/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-green-400" />
                Regulatory Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">{data.compliance.regulatoryCompliance}%</span>
                <Badge variant="outline" className="border-green-400 text-green-400 px-3 py-1">
                  COMPLIANT
                </Badge>
              </div>
              <Progress value={data.compliance.regulatoryCompliance} className="h-2.5" />
              <p className="text-sm text-zinc-400">
                Meets <span className="text-green-400 font-medium">Basel III and EU banking regulations</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Download, label: "Export to Excel", gradient: "from-blue-500 to-cyan-500" },
                { icon: TrendingUp, label: "Compare Portfolio", gradient: "from-green-500 to-emerald-500" },
                { icon: FileText, label: "Generate Report", gradient: "from-purple-500 to-pink-500" },
                { icon: Share2, label: "Share with Team", gradient: "from-amber-500 to-orange-500" }
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 border border-zinc-700 hover:border-zinc-600 text-center transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${action.gradient} mx-auto w-fit mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm text-white font-medium">{action.label}</p>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
