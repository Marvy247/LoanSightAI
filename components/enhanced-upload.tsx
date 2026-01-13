"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, FileText, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

interface EnhancedUploadProps {
  onUpload: (file: File) => void;
}

export default function EnhancedUpload({ onUpload }: EnhancedUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      toast.error("Please upload a PDF file", {
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a"
        }
      });
      return;
    }
    
    if (acceptedFiles.length > 0) {
      toast.success("Document uploaded successfully!", {
        icon: "🚀",
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a"
        }
      });
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">Upload Loan Document</CardTitle>
              <CardDescription className="text-zinc-400">
                Drag and drop or click to browse • PDF files only
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
                transition-all duration-300 relative overflow-hidden
                ${isDragActive 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/30'
                }
              `}
            >
              <input {...getInputProps()} />
              
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col items-center gap-4">
                {isDragActive ? (
                  <>
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Upload className="h-16 w-16 text-blue-400" />
                    </motion.div>
                    <p className="text-lg text-blue-400 font-medium">Drop the document here...</p>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700"
                    >
                      <FileText className="h-12 w-12 text-zinc-400" />
                    </motion.div>
                    <div>
                      <p className="text-lg text-white font-medium mb-2">
                        Drop your PDF here, or <span className="text-blue-400">click to browse</span>
                      </p>
                      <p className="text-sm text-zinc-500">
                        Credit agreements • Loan documents • LMA standard forms
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sample Documents */}
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-zinc-800" />
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Quick Demo</p>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const mockFile = new File([""], "sample-credit-agreement.pdf", { type: "application/pdf" });
                  onUpload(mockFile);
                }}
                className="p-4 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 border border-zinc-700 hover:border-zinc-600 text-left transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Sample Agreement</p>
                </div>
                <p className="text-xs text-zinc-500">$500M Syndicated Loan</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const mockFile = new File([""], "sample-leveraged-loan.pdf", { type: "application/pdf" });
                  onUpload(mockFile);
                }}
                className="p-4 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 border border-zinc-700 hover:border-zinc-600 text-left transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <FileText className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Leveraged Loan</p>
                </div>
                <p className="text-xs text-zinc-500">$250M LBO Financing</p>
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
