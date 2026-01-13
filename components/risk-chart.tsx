"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
  { name: "Low Risk", value: 45, color: "#10b981" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 20, color: "#ef4444" }
];

export default function RiskChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Risk Distribution</CardTitle>
          <CardDescription className="text-zinc-400">
            Portfolio risk analysis across all covenants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  color: "#fff"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-3 gap-3 mt-6">
            {data.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-xs text-zinc-400">{item.name}</p>
                </div>
                <p className="text-xl font-bold text-white">{item.value}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
