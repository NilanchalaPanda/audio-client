export default function UploadStatus({ status, message }) {
  if (!status) return null;

  const base = "mt-6 p-4 rounded-lg text-sm border";

  if (status === "success") {
    return (
      <div
        className={`${base} bg-green-900/20 border-green-700 text-green-400`}
      >
        {message}
      </div>
    );
  }

  if (status === "processing") {
    return (
      <div className={`${base} bg-blue-900/20 border-blue-700 text-blue-400`}>
        Processing file...
      </div>
    );
  }

  if (status === "duplicate") {
    return (
      <div
        className={`${base} bg-yellow-900/20 border-yellow-700 text-yellow-400`}
      >
        Duplicate detected. This audio file already exists in the system.
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`${base} bg-red-900/20 border-red-700 text-red-400`}>
        {message || "Upload failed. Please try again."}
      </div>
    );
  }

  return null;
}
