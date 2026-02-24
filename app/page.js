import Navbar from "@/components/Navbar";
import UploadCard from "@/components/UploadCard";
import MetricsDashboard from "@/components/MetricsDashboard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0c0d12] mb-10">
      <Navbar />

      <main className="flex flex-col items-center flex-1 px-6 pt-10">
        <div className="text-center max-w-3xl mb-10">
          <h1 className="text-4xl font-semibold text-white mb-4">
            Audio Deduplication System
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Upload audio samples securely. Files are hashed using SHA-256 and
            compared against existing records to prevent duplicate storage.
          </p>
        </div>

        <MetricsDashboard />

        <UploadCard />
      </main>
    </div>
  );
}
