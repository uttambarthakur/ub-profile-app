"use client";

import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/clientApp"; // adjust path to your clientApp.ts

interface DownloadPdfButtonProps {
  /** Path inside the bucket, e.g. "documents/report.pdf" or "users/123/invoice.pdf" */
  storagePath: string;
  /** Optional custom filename for the downloaded file */
  fileName?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function DownloadPdfButton({
  storagePath,
  fileName = "document.pdf",
  className = "",
  children,
}: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
  setLoading(true);
  setError(null);

  try {
    const fileRef = ref(storage, storagePath);
    const url = await getDownloadURL(fileRef);

    // This method does NOT require CORS
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;           // suggested filename
    a.target = "_blank";             // optional
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Download failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`px-2 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition ${className}`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Downloading...
          </span>
        ) : (
          children || "Download PDF"
        )}
      </button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </>
  );
}