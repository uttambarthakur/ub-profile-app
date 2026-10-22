import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-expect-error Next.js handles global CSS imports at build time.
import "./globals.css";
import NavBar from "@/components/NavBar";
import { FirebaseUIProviderHoc } from "@/lib/firebase/ui";
import ConditionalFooter from "@/components/ConditionalFooter";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UB",
  description: "UB application",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FirebaseUIProviderHoc>
          <NavBar />
          {children}
          <ConditionalFooter />
        </FirebaseUIProviderHoc>
      </body>
    </html>
  );
}
