import React from "react";
import ScrollCard from "@/components/ScrollCard";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 py-4 sm:px-6 lg:px-8">
      <ScrollCard>{children}</ScrollCard>
    </div>
  );
}