"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentUploadProps {
  onUpload: (file: File) => void;
}

export default function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
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
    <Card className="bg-slate-900 border-slate-800 mb-8">
      <CardHeader>
        <CardTitle className="text-white">Upload Loan Document</CardTitle>
        <CardDescription className="text-slate-400">
          Drag and drop a credit agreement or loan document for instant analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-200
            ${isDragActive 
              ? 'border-blue-500 bg-blue-500/10' 
              : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {isDragActive ? (
              <>
                <Upload className="h-16 w-16 text-blue-400 animate-bounce" />
                <p className="text-lg text-blue-400 font-medium">Drop the document here...</p>
              </>
            ) : (
              <>
                <FileText className="h-16 w-16 text-slate-400" />
                <div>
                  <p className="text-lg text-white font-medium mb-2">
                    Drop your PDF here, or click to browse
                  </p>
                  <p className="text-sm text-slate-400">
                    Supports credit agreements, loan documents, and LMA standard forms
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Demo Button */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-slate-800"></div>
          <p className="text-sm text-slate-500">or try a sample document</p>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              const mockFile = new File([""], "sample-credit-agreement.pdf", { type: "application/pdf" });
              onUpload(mockFile);
            }}
            className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-colors"
          >
            <p className="text-sm font-medium text-white">Sample: Credit Agreement</p>
            <p className="text-xs text-slate-400 mt-1">$500M Syndicated Loan</p>
          </button>
          <button
            onClick={() => {
              const mockFile = new File([""], "sample-leveraged-loan.pdf", { type: "application/pdf" });
              onUpload(mockFile);
            }}
            className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-colors"
          >
            <p className="text-sm font-medium text-white">Sample: Leveraged Loan</p>
            <p className="text-xs text-slate-400 mt-1">$250M LBO Financing</p>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
