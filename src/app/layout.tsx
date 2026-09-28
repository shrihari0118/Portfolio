import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shri Harihara Suthan M | AI Developer",
  description:
    "AI Developer portfolio focused on LLMs, RAG, FastAPI, Generative AI and practical AI systems.",
  metadataBase: new URL("https://shri-harihara-suthan.vercel.app"),
  openGraph: {
    title: "Shri Harihara Suthan M | AI Developer",
    description:
      "AI Developer portfolio focused on LLMs, RAG, FastAPI, Generative AI and practical AI systems.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
