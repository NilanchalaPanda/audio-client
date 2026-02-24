import SystemStatus from "./SystemStatus";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-5 border-b border-zinc-800 bg-[#0f1117]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white">
          Audio Dedupe System
        </h1>

        <div className="flex items-center gap-6">
          <span className="text-sm text-zinc-500 hidden sm:block">
            Content-Based Duplicate Detection
          </span>

          <SystemStatus />
        </div>
      </div>
    </nav>
  );
}
