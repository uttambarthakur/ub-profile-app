"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  return pathname.startsWith("/ask-me") ? null : <Footer />;
}