import "./globals.css";
import { Inter, Bonheur_Royale } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// const bonheurRoyale = Bonheur_Royale({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-bonheur",
// });

export const metadata = {
  title: "Audio Deduplication Upload",
  description: "Upload audio files and detect duplicates",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          bg-[#0f0f13] 
          text-zinc-200 
          font-sans
        `}
      >
        {children}
      </body>
    </html>
  );
}
