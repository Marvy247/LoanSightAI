"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, Brain, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";

interface ProcessingAnimationProps {
  progress: number;
}

const stages = [
  { progress: 25, text: "Parsing document structure...", icon: FileText, color: "text-blue-400" },
  { progress: 50, text: "Extracting key terms and covenants...", icon: Search, color: "text-purple-400" },
  { progress: 75, text: "AI analyzing risk factors...", icon: Brain, color: "text-amber-400" },
  { progress: 100, text: "Analysis complete!", icon: CheckCircle, color: "text-green-400" }
];

export default function ProcessingAnimation({ progress }: ProcessingAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const stage = stages.findIndex(s => progress <= s.progress);
    setCurrentStage(stage === -1 ? stages.length - 1 : stage);

    // Confetti when complete
    if (progress === 100) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fff', '#000', '#3b82f6', '#10b981']
        });
      }, 300);
    }
  }, [progress]);

  const CurrentIcon = stages[currentStage]?.icon || FileText;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-lg bg-gradient-to-br from-zinc-900 to-black border-zinc-800 shadow-2xl">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-white text-2xl">Analyzing Document</CardTitle>
              <CardDescription className="text-zinc-400 mt-2">
                AI is processing your credit agreement
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Animated Icon */}
            <div className="flex justify-center">
              <motion.div
                key={currentStage}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="p-6 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-zinc-700"
              >
                <CurrentIcon className={`h-12 w-12 ${stages[currentStage]?.color}`} />
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Progress</span>
                <span className="text-white font-bold">{progress}%</span>
              </div>
            </div>

            {/* Stage Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className={`text-lg font-medium ${stages[currentStage]?.color}`}>
                  {stages[currentStage]?.text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Stage Indicators */}
            <div className="flex justify-between pt-4">
              {stages.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      progress >= stage.progress
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-400"
                        : "bg-zinc-800 border-zinc-700"
                    }`}
                  >
                    <stage.icon
                      className={`h-5 w-5 ${
                        progress >= stage.progress ? "text-white" : "text-zinc-600"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
