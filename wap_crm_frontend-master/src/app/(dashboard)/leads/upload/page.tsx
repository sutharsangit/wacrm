'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

export default function LeadsUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ processedCount: number; insertedCount: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (f: File) => {
    if (f.type !== "text/csv" && !f.name.endsWith('.csv')) {
      setError("Please upload a valid CSV file.");
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
    setResult(null);
  };

  const onUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = Cookies.get('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/leads/upload-csv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Upload Leads (CSV)</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Import your existing contacts and classify them automatically.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
        {result ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Upload Successful!</h2>
              <p className="text-muted-foreground mt-2">
                Processed <b>{result.processedCount}</b> rows. <br/>
                Inserted <b>{result.insertedCount}</b> new leads.
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
              className="mt-6 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Upload Another File
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                dragActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleChange}
              />
              
              {!file ? (
                <div className="flex flex-col items-center gap-3 cursor-pointer">
                  <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-sm">
                    <UploadCloud className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Click or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">CSV files only. Max size 10MB.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="text-xs text-destructive hover:underline mt-2"
                  >
                    Remove file
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-border">
              <button
                disabled={!file || uploading}
                onClick={onUpload}
                className="bg-primary hover:bg-primary/95 text-black font-semibold px-8 py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-primary/10 flex items-center gap-2 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Upload Leads</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-muted/50 border border-border rounded-xl p-5">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-primary" />
          CSV Format Guidelines
        </h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Your CSV file must include a header row. We recommend including the following columns: <b>name, contact number, email, lead base, type</b>. 
          The system will automatically classify leads as Hot, Warm, or Cold based on the type column.
        </p>
      </div>
    </div>
  );
}
