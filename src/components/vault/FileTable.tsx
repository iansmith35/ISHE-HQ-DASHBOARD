
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, MoreVertical, FileText, Image as ImageIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export type UploadedFile = {
  id: number;
  name: string;
  type: 'pdf' | 'image' | string;
  tags: string[];
  date: string;
};

const mockFiles: UploadedFile[] = [
  { id: 1, name: "Gas_Safety_Cert_2023.pdf", type: "pdf", tags: ["certificate", "gas", "2023"], date: "2023-10-15" },
  { id: 2, name: "Boiler_Manual.pdf", type: "pdf", tags: ["manual", "boiler"], date: "2023-09-22" },
  { id: 3, name: "Leaky_pipe_photo.jpg", type: "image", tags: ["photo", "leak", "job-003"], date: "2023-11-01" },
  { id: 4, name: "TV_Licence.pdf", type: "pdf", tags: ["personal", "licence"], date: "2023-01-05" },
];

type FileTableProps = {
    files: UploadedFile[];
}

export function FileTable({ files }: FileTableProps) {
    const getFileIcon = (type: string) => {
        if (type === 'pdf' || type === 'application/pdf') return <FileText className="h-5 w-5 text-muted-foreground" />;
        if (type.startsWith('image')) return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  return (
    <div className="w-full">
        <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {files.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No files uploaded yet.
                    </TableCell>
                </TableRow>
            )}
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span>{file.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                    {file.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </TableCell>
              <TableCell>{file.date}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

