"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Time Saved", value: 82, suffix: "%", icon: TrendingUp, color: "from-green-400 to-emerald-500" },
  { label: "Documents Analyzed", value: 1247, suffix: "", icon: FileText, color: "from-blue-400 to-cyan-500" },
  { label: "Risk Flags", value: 2891, suffix: "", icon: AlertTriangle, color: "from-amber-400 to-yellow-500" },
  { label: "Cost Savings", value: 2.3, suffix: "M", prefix: "$", icon: CheckCircle2, color: "from-emerald-400 to-green-500" }
];

export default function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 hover:border-zinc-700 transition-all duration-300 group overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <CardContent className="pt-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">
                    {isVisible ? (
                      <>
                        {stat.prefix}
                        <CountUp
                          end={stat.value}
                          duration={2}
                          decimals={stat.suffix === "M" ? 1 : 0}
                          separator=","
                        />
                        {stat.suffix}
                      </>
                    ) : (
                      "0"
                    )}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
