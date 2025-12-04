import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CognitiveCook",
  description: "A CTML-based cooking education platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Using CDN for Tailwind to maintain existing styles without complex build setup */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}