import axiosInstance from "./axios";

/* =========================
   Upload File
========================= */
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      if (!onProgress) return;
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      onProgress(percent);
    },
  });

  return response.data; // { jobId }
};

/* =========================
   Job Status
========================= */
export const getJobStatus = async (jobId) => {
  const response = await axiosInstance.get(`/jobs/${jobId}`);
  return response.data; // { status, error_message }
};

/* =========================
   Metrics
========================= */
export const getMetrics = async () => {
  const response = await axiosInstance.get("/metrics");
  return response.data;
};

/* =========================
   Signed URL
========================= */
export const getSignedUrl = async (path) => {
  const response = await axiosInstance.get(`/files/signed/${path}`);
  return response.data;
};

/* =========================
   Health
========================= */
export const checkSystemHealth = async () => {
  const response = await axiosInstance.get("/health");
  return response.data;
};
