// import React, { useState, useRef } from "react";
// import {
//   Upload,
//   X,
//   FileText,
//   // Loader2,
//   CheckCircle2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";

// type FileStatus = "uploading" | "complete" | "error";

// interface FileItem {
//   id: number;
//   file: File;
//   name: string;
//   size: string;
//   sizeBytes: number;
//   status: FileStatus;
//   progress: number;
//   preview?: string;
// }

// export default function FileDropZone() {
//   const [files, setFiles] = useState<FileItem[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   console.log("Uploaded files", files);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const droppedFiles = Array.from(e.dataTransfer.files);
//     addFiles(droppedFiles);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     addFiles(selectedFiles);
//   };

//   const addFiles = (newFiles: File[]) => {
//     const filesWithId: FileItem[] = newFiles.map((file, index) => {
//       const item: FileItem = {
//         id: Date.now() + index,
//         file,
//         name: file.name,
//         size: formatFileSize(file.size),
//         sizeBytes: file.size,
//         status: "uploading",
//         progress: 0,
//       };

//       // Generate preview for images
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setFiles((prev) =>
//             prev.map((f) =>
//               f.id === item.id
//                 ? { ...f, preview: e.target?.result as string }
//                 : f
//             )
//           );
//         };
//         reader.readAsDataURL(file);
//       }

//       return item;
//     });

//     setFiles((prev) => [...prev, ...filesWithId]);

//     filesWithId.forEach((fileItem) => {
//       simulateUpload(fileItem.id);
//     });
//   };

//   const simulateUpload = (fileId: number) => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.random() * 25;

//       if (progress >= 100) {
//         progress = 100;
//         clearInterval(interval);

//         setFiles((prev) =>
//           prev.map((f) =>
//             f.id === fileId
//               ? { ...f, progress: 100, status: "complete" as FileStatus }
//               : f
//           )
//         );
//       } else {
//         setFiles((prev) =>
//           prev.map((f) =>
//             f.id === fileId ? { ...f, progress: Math.floor(progress) } : f
//           )
//         );
//       }
//     }, 200);
//   };

//   const removeFile = (id: number) => {
//     setFiles((prev) => prev.filter((f) => f.id !== id));
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
//   };

//   const getFileIcon = (file: FileItem) => {
//     if (file.preview) {
//       return (
//         <img
//           src={file.preview}
//           alt={file.name}
//           className="w-10 h-10 rounded object-cover"
//         />
//       );
//     }

//     if (file.name.endsWith(".pdf")) {
//       return (
//         <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center">
//           <FileText className="w-5 h-5 text-red-600" />
//         </div>
//       );
//     }

//     return (
//       <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
//         <FileText className="w-5 h-5 text-gray-600" />
//       </div>
//     );
//   };

//   return (
//     <div className="w-full">
//       <div>
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-1">Import Users</h2>
//           <p className="text-sm text-gray-500">
//             Select and upload the files of your choice
//           </p>
//         </div>

//         <div
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           className={`border-2 border-dashed rounded-lg px-12 py-8 text-center transition-colors ${
//             isDragging
//               ? "border-blue-500 bg-blue-50"
//               : "border-gray-300 hover:border-gray-400"
//           }`}
//         >
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             onChange={handleFileInput}
//             className="hidden"
//           />

//           <div className="flex flex-col items-center">
//             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
//               <Upload className="w-6 h-6 text-gray-600" />
//             </div>

//             <p className="text-base font-medium mb-1">
//               Choose a file or drag & drop it here
//             </p>
//             <p className="text-sm text-gray-500 mb-6">
//               JPEG, PNG, PDF, and MP4 formats, up to 50MB
//             </p>

//             <Button
//               variant="outline"
//               onClick={() => fileInputRef.current?.click()}
//               className="px-6"
//             >
//               Browse File
//             </Button>
//           </div>
//         </div>

//         {files.length > 0 && (
//           <div className="mt-6 space-y-3">
//             {files.map((fileItem) => (
//               <div
//                 key={fileItem.id}
//                 className="flex items-center gap-4 p-3 rounded-lg border bg-white"
//               >
//                 {getFileIcon(fileItem)}

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between mb-1">
//                     <p className="text-sm font-medium truncate pr-4">
//                       {fileItem.name}
//                     </p>
//                     <span className="text-xs text-gray-500 flex-shrink-0">
//                       {fileItem.size}
//                     </span>
//                   </div>

//                   {fileItem.status === "uploading" && (
//                     <>
//                       <Progress
//                         value={fileItem.progress}
//                         className="h-1 mb-1"
//                       />
//                       <p className="text-xs text-gray-500">
//                         {fileItem.progress}%
//                       </p>
//                     </>
//                   )}

//                   {fileItem.status === "complete" && (
//                     <div className="flex items-center gap-1 text-xs text-green-600">
//                       <CheckCircle2 className="w-3 h-3" />
//                       <span>Complete</span>
//                     </div>
//                   )}
//                 </div>

//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => removeFile(fileItem.id)}
//                   className="flex-shrink-0 h-8 w-8 p-0 hover:bg-gray-100"
//                 >
//                   <X className="h-4 w-4 text-gray-500" />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type FileStatus = "pending" | "uploading" | "complete" | "error";

interface FileItem {
  id: number;
  file: File;
  name: string;
  size: string;
  sizeBytes: number;
  status: FileStatus;
  preview?: string;
  error?: string;
}

interface FileDropZoneProps {
  onImport: (file: File) => void;
  isUploading?: boolean;
}

export default function FileDropZone({
  onImport,
  isUploading = false,
}: FileDropZoneProps) {
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

  console.log("Files", files);

  const addFiles = (newFiles: File[]) => {
    const filesWithId: FileItem[] = newFiles.map((file, index) => {
      const item: FileItem = {
        id: Date.now() + index,
        file,
        name: file.name,
        size: formatFileSize(file.size),
        sizeBytes: file.size,
        status: "pending",
      };

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? { ...f, preview: e.target?.result as string }
                : f
            )
          );
        };
        reader.readAsDataURL(file);
      }

      return item;
    });

    setFiles((prev) => [...prev, ...filesWithId]);
  };

  const handleUpload = (fileItem: FileItem) => {
    // Mark file as uploading
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileItem.id ? { ...f, status: "uploading" as FileStatus } : f
      )
    );

    // Call the parent's import function
    onImport(fileItem.file);
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

  const getFileIcon = (file: FileItem) => {
    if (file.preview) {
      return (
        <img
          src={file.preview}
          alt={file.name}
          className="w-10 h-10 rounded object-cover"
        />
      );
    }

    if (file.name.endsWith(".pdf")) {
      return (
        <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center">
          <FileText className="w-5 h-5 text-red-600" />
        </div>
      );
    }

    if (file.name.endsWith(".csv")) {
      return (
        <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center">
          <FileText className="w-5 h-5 text-green-600" />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
        <FileText className="w-5 h-5 text-gray-600" />
      </div>
    );
  };

  return (
    <div className="w-full">
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Import Users</h2>
          <p className="text-sm text-gray-500">
            Select and upload the CSV file of your choice
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg px-12 py-8 text-center transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>

            <p className="text-base font-medium mb-1">
              Choose a file or drag & drop it here
            </p>
            <p className="text-sm text-gray-500 mb-6">CSV format, up to 50MB</p>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="px-6"
              disabled={isUploading}
            >
              Browse File
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="flex items-center gap-4 p-3 rounded-lg border bg-white"
              >
                {getFileIcon(fileItem)}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate pr-4">
                    {fileItem.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {fileItem.size}
                    </span>

                    {fileItem.status === "uploading" && (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    )}

                    {fileItem.status === "complete" && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Complete</span>
                      </div>
                    )}

                    {fileItem.status === "error" && (
                      <div className="flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fileItem.error || "Upload failed"}</span>
                      </div>
                    )}
                  </div>
                </div>

                {fileItem.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleUpload(fileItem)}
                    disabled={isUploading}
                    className="flex-shrink-0"
                  >
                    Upload
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(fileItem.id)}
                  className="flex-shrink-0 h-8 w-8 p-0 hover:bg-gray-100"
                  disabled={fileItem.status === "uploading"}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
