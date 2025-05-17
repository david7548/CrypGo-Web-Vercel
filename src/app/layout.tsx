import "@/styles/globals.css"; // Import global styles
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-100 m-0 p-0 font-roboto text-gray-800">
        <Navbar />
        <main className="w-full m-0 p-0">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
