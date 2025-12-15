import React, { useState, useRef } from "react";
import { Upload, X, File, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type FileStatus = "uploading" | "complete" | "error";

interface FileItem {
  id: number;
  file: File;
  name: string;
  size: string;
  status: FileStatus;
  progress: number;
}

export default function FileDropZone() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const filesWithId: FileItem[] = newFiles.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      status: "uploading",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...filesWithId]);

    // Simulate upload for each file
    filesWithId.forEach((fileItem) => {
      simulateUpload(fileItem.id);
    });
  };

  const simulateUpload = (fileId: number) => {
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress: 100, status: "complete" as FileStatus }
              : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: Math.floor(progress) } : f
          )
        );
      }
    }, 200);
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />

          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />

          <p className="text-lg font-medium mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-gray-500">Support for multiple files</p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="font-medium mb-3">Files ({files.length})</h3>
            {files.map((fileItem) => (
              <div key={fileItem.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {fileItem.status === "uploading" && (
                      <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                    )}
                    {fileItem.status === "complete" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                    {fileItem.status === "error" && (
                      <File className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {fileItem.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {fileItem.size}
                        {fileItem.status === "uploading" &&
                          ` • ${fileItem.progress}%`}
                        {fileItem.status === "complete" && " • Complete"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileItem.id)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {fileItem.status === "uploading" && (
                  <Progress value={fileItem.progress} className="h-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
