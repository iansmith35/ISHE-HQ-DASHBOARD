"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from 'lucide-react';
import { cn } from "@/lib/utils";

export function Dropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
        "border-border/60 hover:border-primary/80 hover:bg-secondary",
        isDragActive && "border-primary bg-primary/10"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadCloud className={cn("w-10 h-10 mb-3 text-muted-foreground", isDragActive && "text-primary")} />
        {isDragActive ? (
          <p className="font-semibold text-primary">Drop the files here ...</p>
        ) : (
          <>
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PDF, PNG, JPG, DOCX, etc.</p>
          </>
        )}
      </div>
    </div>
  );
}
