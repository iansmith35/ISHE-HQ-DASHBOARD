
"use client";

import { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { autoTagDocument } from "@/ai/flows/auto-tag-uploaded-documents";
import type { UploadedFile } from "./FileTable";

type DropzoneProps = {
  onFileUpload: (file: UploadedFile) => void;
};

export function Dropzone({ onFileUpload }: DropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      toast({
        variant: "destructive",
        title: "File upload error",
        description: fileRejections.map(fr => `${fr.file.name}: ${fr.errors.map(e => e.message).join(', ')}`).join('\n'),
      });
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const documentDataUri = event.target.result as string;

          const { tags } = await autoTagDocument({
            documentDataUri,
            documentName: file.name,
          });

          onFileUpload({
            id: Date.now(),
            name: file.name,
            type: file.type.startsWith('image') ? 'image' : 'pdf', // Simple type check
            tags,
            date: new Date().toISOString().split('T')[0],
          });

          toast({
            title: "File uploaded successfully",
            description: `"${file.name}" has been uploaded and tagged.`,
          });
        }
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: "Could not read the selected file.",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "An unexpected error occurred during file upload.",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
        "border-border/60 hover:border-primary/80 hover:bg-secondary",
        isDragActive && "border-primary bg-primary/10",
        isUploading && "cursor-wait"
      )}
    >
      <input {...getInputProps()} disabled={isUploading} />
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
        {isUploading ? (
          <>
            <Loader2 className="w-10 h-10 mb-3 text-primary animate-spin" />
            <p className="font-semibold text-primary">Uploading & Analyzing...</p>
          </>
        ) : (
          <>
            <UploadCloud className={cn("w-10 h-10 mb-3 text-muted-foreground", isDragActive && "text-primary")} />
            {isDragActive ? (
              <p className="font-semibold text-primary">Drop the file here ...</p>
            ) : (
              <>
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PDF, PNG, JPG, DOCX, etc.</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
