"use client";

import { useState } from "react";
import { Send, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface QAInterfaceProps {
  documentData: any;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function QAInterface({ documentData }: QAInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I'm analyzing the credit agreement for ${documentData.borrower}. Ask me anything about the loan terms, covenants, or risk factors.`
    }
  ]);
  const [input, setInput] = useState("");

  const predefinedQA: Record<string, string> = {
    "interest rate": `The interest rate is ${documentData.interestRate}. This represents a margin of 325 basis points over SOFR (Secured Overnight Financing Rate). The rate is subject to a leverage-based pricing grid that can adjust the margin by +/- 50 bps based on the borrower's leverage ratio.`,
    "leverage": `Per Section 7.2, the maximum leverage ratio covenant is set at ${documentData.leverage}. This is notably higher than the market standard of 4.0x EBITDA, representing a 37.5% increase. If the ratio exceeds this threshold for two consecutive quarters, it constitutes an Event of Default.`,
    "prepayment": `The credit agreement includes mandatory prepayment provisions in Section 5.3. The borrower must prepay 50% of Excess Cash Flow annually if leverage exceeds 4.0x, and 25% if leverage is below 4.0x. Voluntary prepayments are permitted without penalty after Year 2, with a 2% prepayment premium in Years 1-2.`,
    "default": `Events of Default are detailed in Section 11 and include: (1) Payment default after 5 business days; (2) Cross-default to other debt over $25M; (3) Covenant breach beyond cure period; (4) Material misrepresentation; (5) Bankruptcy or insolvency; (6) Change of control; (7) Material adverse effect on collateral.`,
    "collateral": `The loan is secured by a first-priority lien on substantially all assets of the borrower and guarantors, including accounts receivable, inventory, equipment, and intellectual property. Real estate is subject to separate mortgages. The collateral package is valued at approximately 1.4x the loan amount based on orderly liquidation values.`,
    "covenants": `Financial covenants include: (1) Maximum Leverage Ratio of 5.5x (currently at high-risk level); (2) Minimum Interest Coverage of 3.0x; (3) Minimum Fixed Charge Coverage of 1.2x; (4) Minimum Liquidity of $25M at all times. These are tested quarterly, with the first test date 90 days after closing.`
  };

  const suggestedQuestions = [
    "What is the interest rate structure?",
    "What happens if leverage exceeds 5.5x?",
    "Are there prepayment penalties?",
    "What are the Events of Default?",
    "What collateral secures the loan?",
    "Tell me about the covenants"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);

    // Simple keyword matching for demo
    const inputLower = input.toLowerCase();
    let response = "I don't have specific information about that in the current document. Please try asking about interest rates, leverage, prepayment terms, defaults, collateral, or covenants.";

    for (const [key, value] of Object.entries(predefinedQA)) {
      if (inputLower.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);

    setInput("");
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <Card className="bg-slate-900 border-slate-800 lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Sparkles className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white">Ask Questions</CardTitle>
              <CardDescription className="text-slate-400">
                Natural language Q&A powered by AI
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-200 border border-slate-700"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about loan terms, covenants, risks..."
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Questions */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Suggested Questions</CardTitle>
          <CardDescription className="text-slate-400">
            Click to ask common questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="w-full p-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {question}
                </p>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
