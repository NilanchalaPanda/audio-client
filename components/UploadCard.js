"use client";

import { useState, useEffect, useRef } from "react";
import FileDropzone from "./FileDropZone";
import UploadStatus from "./UploadStatus";
import { uploadFile, getJobStatus } from "../lib/api";

export default function UploadCard() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [jobId, setJobId] = useState(null);

  const resetTimeoutRef = useRef(null);

  const resetState = () => {
    setStatus(null);
    setMessage("");
    setProgress(0);
    setFileName("");
    setJobId(null);
  };

  const handleUpload = async (file) => {
    resetState(); // clear old state first

    setStatus("uploading");
    setProgress(0);
    setFileName(file.name);

    try {
      const result = await uploadFile(file, setProgress);
      setJobId(result.jobId);
      setStatus("processing");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Upload failed");
    }
  };

  /* =========================
     Poll Job Status
  ========================= */
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const result = await getJobStatus(jobId);

        if (result.status === "success") {
          setStatus("success");
          setMessage("File stored successfully.");
          clearInterval(interval);
          scheduleReset();
        }

        if (result.status === "duplicate") {
          setStatus("duplicate");
          clearInterval(interval);
          scheduleReset();
        }

        if (result.status === "failed") {
          setStatus("error");
          setMessage(result.error_message);
          clearInterval(interval);
          scheduleReset();
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  /* =========================
     Auto Reset After Completion
  ========================= */
  const scheduleReset = () => {
    resetTimeoutRef.current = setTimeout(() => {
      resetState();
    }, 4000); // reset after 4 seconds
  };

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[#151720] border border-zinc-800 rounded-xl p-8 w-full max-w-xl shadow-lg">
      <h2 className="text-xl font-medium text-white mb-6">Upload Audio File</h2>

      <FileDropzone onFileSelect={handleUpload} />

      {fileName && (
        <div className="mt-4 text-sm text-zinc-400">
          Selected file: <span className="text-white">{fileName}</span>
        </div>
      )}

      {status === "uploading" && (
        <div className="mt-6">
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-zinc-400 mt-2">Uploading... {progress}%</p>
        </div>
      )}

      {status === "processing" && (
        <div className="mt-6 text-sm text-blue-400">Processing file...</div>
      )}

      <UploadStatus status={status} message={message} />
    </div>
  );
}
