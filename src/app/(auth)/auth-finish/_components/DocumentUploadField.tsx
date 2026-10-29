"use client";

import React from "react";
import { FileText, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadFieldProps {
  documents: File[];
  setDocuments: React.Dispatch<React.SetStateAction<File[]>>;
  label?: string;
  description?: string;
  maxFiles?: number;
  required?: boolean;
  inputId?: string;
}

export default function DocumentUploadField({
  documents,
  setDocuments,
  label = "Verification Documents",
  description = "Upload supporting verification documents (PDF, JPG, PNG, or WEBP).",
  maxFiles = 5,
  required = true,
  inputId = "verification-documents-upload",
}: DocumentUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files || []);
    e.target.value = "";
    if (incoming.length === 0) return;

    const availableSlots = maxFiles - documents.length;
    if (availableSlots <= 0) {
      toast.error(`You can upload up to ${maxFiles} documents`);
      return;
    }

    const toAdd = incoming.slice(0, availableSlots);
    setDocuments((prev) => [...prev, ...toAdd]);
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-base font-semibold text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>

      <input
        id={inputId}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,application/pdf,image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {documents.length < maxFiles && (
        <label
          htmlFor={inputId}
          className="w-full rounded border border-dashed border-gray-300 bg-white py-6 px-4 flex flex-col items-center justify-center text-gray-500 transition-all cursor-pointer hover:border-black hover:text-black hover:bg-gray-50"
        >
          <Upload size={22} strokeWidth={1.75} className="text-gray-400" />
          <span className="text-sm font-medium mt-2 text-gray-800">
            {documents.length === 0 ? "Click to upload verification documents" : "Add more documents"}
          </span>
          <span className="text-xs text-gray-400 mt-1">
            Supported formats: PDF, JPG, PNG, WEBP (Max {maxFiles} files)
          </span>
        </label>
      )}

      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((file, idx) => {
            const isImage = file.type.startsWith("image/");
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

            return (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between gap-3 rounded border border-[#e1e1e1] bg-white px-3.5 py-2.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-9 rounded bg-zinc-100 flex items-center justify-center shrink-0 text-gray-700">
                    {isImage ? <ImageIcon size={18} /> : <FileText size={18} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{sizeInMB} MB</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeDocument(idx)}
                  className="size-7 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  aria-label="Remove document"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

