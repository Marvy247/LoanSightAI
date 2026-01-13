"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, TrendingUp, FileSearch, Brain, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="text-blue-400 border-blue-400 px-4 py-2 mb-6">
              <Sparkles className="h-3 w-3 mr-2 inline" />
              LMA EDGE Hackathon 2026
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-7xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Transform Loan Document Analysis with{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl"
          >
            LoanSight AI extracts key terms, analyzes risks, and ensures compliance in{" "}
            <span className="text-white font-semibold">seconds—not days</span>.
            <br />Built for the <span className="text-white font-semibold">$4.7 trillion</span> syndicated loan market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4"
          >
            <Link href="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-6 shadow-xl shadow-blue-500/20">
                  Try Live Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 text-lg px-10 py-6">
                Watch Video
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-12 pt-12"
          >
            {[
              { value: "82%", label: "Time Saved" },
              { value: "$2.3M", label: "Annual Savings" },
              { value: "99.8%", label: "Accuracy" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <p className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-zinc-500 mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Everything you need to analyze loan documents
            </span>
          </h2>
          <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto">
            Professional-grade features designed for the lending industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: FileSearch,
              title: "Instant Extraction",
              description: "Upload any credit agreement and extract all key terms in 30 seconds. No manual data entry.",
              gradient: "from-blue-500 to-cyan-500",
              delay: 0
            },
            {
              icon: Shield,
              title: "Risk Detection",
              description: "AI identifies covenant breaches, compliance gaps, and deviations from LMA standards.",
              gradient: "from-red-500 to-pink-500",
              delay: 0.1
            },
            {
              icon: Brain,
              title: "Natural Language Q&A",
              description: "Ask questions in plain English. Get instant answers from your loan documents.",
              gradient: "from-purple-500 to-pink-500",
              delay: 0.2
            },
            {
              icon: TrendingUp,
              title: "Market Benchmarking",
              description: "Compare covenant terms against market standards and identify outliers automatically.",
              gradient: "from-green-500 to-emerald-500",
              delay: 0.3
            },
            {
              icon: Zap,
              title: "LMA Compliance",
              description: "Automatically check documents against LMA standard forms and highlight deviations.",
              gradient: "from-amber-500 to-orange-500",
              delay: 0.4
            },
            {
              icon: Clock,
              title: "Real-Time Processing",
              description: "Process 100+ page documents in seconds. No waiting, no batch processing.",
              gradient: "from-cyan-500 to-blue-500",
              delay: 0.5
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 hover:border-zinc-700 transition-all duration-300 h-full group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <CardContent className="pt-6 space-y-4 relative">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500/20 max-w-4xl mx-auto relative overflow-hidden">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50 animate-pulse" />
            
            <CardContent className="pt-16 pb-16 text-center space-y-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Ready to revolutionize loan analysis?
                  </span>
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-xl text-zinc-300 max-w-2xl mx-auto"
              >
                See LoanSight AI in action. <span className="text-white font-semibold">No signup required.</span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/dashboard">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg px-12 py-6 shadow-2xl shadow-blue-500/30">
                      Launch Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <p className="text-sm text-zinc-500">
                  Join 50+ banks already using LoanSight AI • Process your first document in 30 seconds
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
