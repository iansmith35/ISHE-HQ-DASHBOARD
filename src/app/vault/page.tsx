
"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Dropzone } from '@/components/vault/Dropzone';
import { FileTable, UploadedFile } from '@/components/vault/FileTable';
import { Card, CardContent } from '@/components/ui/card';

const mockFiles: UploadedFile[] = [
  { id: 1, name: "Gas_Safety_Cert_2023.pdf", type: "pdf", tags: ["certificate", "gas", "2023"], date: "2023-10-15" },
  { id: 2, name: "Boiler_Manual.pdf", type: "pdf", tags: ["manual", "boiler"], date: "2023-09-22" },
  { id: 3, name: "Leaky_pipe_photo.jpg", type: "image", tags: ["photo", "leak", "job-003"], date: "2023-11-01" },
  { id: 4, name: "TV_Licence.pdf", type: "pdf", tags: ["personal", "licence"], date: "2023-01-05" },
];


export default function VaultPage() {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles);

  const handleFileUpload = (newFile: UploadedFile) => {
    setFiles((prevFiles) => [newFile, ...prevFiles]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Vault" />
      <main className="flex-1 p-6 space-y-6">
        <Card className="border-border/60">
            <CardContent className="p-6">
                <Dropzone onFileUpload={handleFileUpload} />
            </CardContent>
        </Card>
        <Card className="border-border/60">
            <CardContent className="p-6">
                <FileTable files={files} />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
